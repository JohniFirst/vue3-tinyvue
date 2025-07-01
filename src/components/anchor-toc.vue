<template>
  <div class="anchor-toc" :style="{ maxHeight: navMaxHeight }" ref="anchorTocRef">
    <div v-if="tocItems.length === 0" class="toc-empty">
      <p>未找到标题内容</p>
    </div>
    <ul v-else class="toc-list" ref="tocListRef">
      <li
        v-for="item in tocItems"
        :key="item.id"
        :class="['toc-item', { active: item.id === activeId }]"
        :style="{ paddingLeft: `${item.level * 16}px` }"
        @click="scrollToAnchor(item.id)"
      >
        <span class="toc-text">{{ item.text }}</span>
        <span class="toc-level-indicator">H{{ item.level }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

interface TocItem {
  id: string
  text: string
  level: number
  element: HTMLElement
}

const props = defineProps({
  targetElement: {
    type: String,
    default: '',
  },
  scrollWrapper: {
    type: String,
    default: '',
  },
  navMaxHeight: {
    type: String,
    default: '400px',
  },
  offsetTop: {
    type: Number,
    default: 80,
  },
})

const tocItems = ref<TocItem[]>([])
const activeId = ref<string>('')
const tocListRef = ref<HTMLElement>()
const anchorTocRef = ref<HTMLElement>()

let scrollContainer: HTMLElement | Window = window
let targetContainer: HTMLElement | null = null
let observer: IntersectionObserver | null = null
let isScrolling = false
const scrollThrottleTimeout: number | null = null
let lastScrollTime = 0

// 节流函数
const throttle = <T extends (...args: unknown[]) => void>(func: T, delay: number): T => {
  return ((...args: unknown[]) => {
    const now = Date.now()
    if (now - lastScrollTime >= delay) {
      func(...args)
      lastScrollTime = now
    }
  }) as T
}

// 生成唯一ID
const generateId = (text: string, index: number): string => {
  return `toc-${text.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}-${index}`
}

// 扫描目标元素内的h标签
const scanHeadings = (): void => {
  if (!targetContainer) return

  try {
    const headings = targetContainer.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const items: TocItem[] = []

    headings.forEach((heading, index) => {
      const element = heading as HTMLElement
      const level = parseInt(element.tagName.charAt(1))
      const text = element.textContent?.trim() || ''

      if (!text) return // 跳过空标题

      // 如果没有ID，生成一个
      if (!element.id) {
        element.id = generateId(text, index)
      }

      items.push({
        id: element.id,
        text,
        level,
        element,
      })
    })

    tocItems.value = items
  } catch (error) {
    console.error('扫描标题时出错:', error)
    tocItems.value = []
  }
}

// 滚动到指定锚点
const scrollToAnchor = async (id: string): Promise<void> => {
  const element = document.getElementById(id)
  if (!element) {
    console.warn(`未找到ID为 ${id} 的元素`)
    return
  }

  isScrolling = true

  try {
    const rect = element.getBoundingClientRect()
    const scrollTop =
      scrollContainer === window ? window.pageYOffset : (scrollContainer as HTMLElement).scrollTop

    const targetScrollTop = scrollTop + rect.top - props.offsetTop

    if (scrollContainer === window) {
      window.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth',
      })
    } else {
      scrollContainer.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth',
      })
    }

    // 设置高亮
    activeId.value = id

    // 延迟重置滚动状态
    setTimeout(() => {
      isScrolling = false
    }, 800) // 减少延迟时间
  } catch (error) {
    console.error('滚动到锚点时出错:', error)
    isScrolling = false
  }
}

// 设置交叉观察器
const setupIntersectionObserver = (): void => {
  if (!tocItems.value.length) return

  try {
    observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling) return // 如果正在滚动，不更新高亮

        let currentActiveId = ''
        let maxRatio = 0

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            currentActiveId = entry.target.id
          }
        })

        if (currentActiveId && currentActiveId !== activeId.value) {
          activeId.value = currentActiveId
          // 使用 requestAnimationFrame 优化性能
          requestAnimationFrame(() => {
            scrollActiveItemIntoView()
          })
        }
      },
      {
        root: scrollContainer === window ? null : (scrollContainer as HTMLElement),
        rootMargin: '-10% 0px -80% 0px',
        threshold: [0, 0.1, 0.5, 1.0],
      },
    )

    tocItems.value.forEach((item) => {
      observer?.observe(item.element)
    })
  } catch (error) {
    console.error('设置交叉观察器时出错:', error)
  }
}

// 滚动高亮项到可视区域 - 优化版本
const scrollActiveItemIntoView = (): void => {
  if (!tocListRef.value || !activeId.value || !anchorTocRef.value) return

  try {
    const activeElement = tocListRef.value.querySelector('.active') as HTMLElement
    if (!activeElement) return

    const container = anchorTocRef.value
    const elementTop = activeElement.offsetTop
    const elementBottom = elementTop + activeElement.offsetHeight
    const containerTop = container.scrollTop
    const containerBottom = containerTop + container.clientHeight

    // 只有当元素不在可视区域内时才滚动
    if (elementTop < containerTop || elementBottom > containerBottom) {
      let targetScrollTop: number

      if (elementTop < containerTop) {
        // 元素在可视区域上方，滚动到顶部
        targetScrollTop = elementTop - 10
      } else {
        // 元素在可视区域下方，滚动到底部
        targetScrollTop = elementBottom - container.clientHeight + 10
      }

      // 使用 requestAnimationFrame 确保平滑滚动
      requestAnimationFrame(() => {
        container.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth',
        })
      })
    }
  } catch (error) {
    console.error('滚动高亮项到可视区域时出错:', error)
  }
}

// 初始化
const init = (): void => {
  try {
    // 获取目标容器
    if (props.targetElement) {
      targetContainer = document.querySelector(props.targetElement)
      if (!targetContainer) {
        console.warn(`未找到目标元素: ${props.targetElement}`)
        return
      }
    } else {
      targetContainer = document.body
    }

    // 获取滚动容器
    if (props.scrollWrapper) {
      const wrapper = document.querySelector(props.scrollWrapper) as HTMLElement
      if (wrapper) {
        scrollContainer = wrapper
      } else {
        console.warn(`未找到滚动容器: ${props.scrollWrapper}`)
      }
    }

    if (targetContainer) {
      scanHeadings()
      // 使用 requestAnimationFrame 延迟设置观察器
      requestAnimationFrame(() => {
        setupIntersectionObserver()
      })
    }
  } catch (error) {
    console.error('初始化导航组件时出错:', error)
  }
}

// 监听滚动事件（备用方案）- 使用节流优化
const handleScroll = throttle((): void => {
  if (!tocItems.value.length || isScrolling) return

  try {
    const scrollTop =
      scrollContainer === window ? window.pageYOffset : (scrollContainer as HTMLElement).scrollTop

    let currentActiveId = ''

    for (let i = tocItems.value.length - 1; i >= 0; i--) {
      const item = tocItems.value[i]
      const elementTop = item.element.offsetTop

      if (scrollTop >= elementTop - props.offsetTop) {
        currentActiveId = item.id
        break
      }
    }

    if (currentActiveId && currentActiveId !== activeId.value) {
      activeId.value = currentActiveId
      // 使用 requestAnimationFrame 优化性能
      requestAnimationFrame(() => {
        scrollActiveItemIntoView()
      })
    }
  } catch (error) {
    console.error('处理滚动事件时出错:', error)
  }
}, 16) // 约60fps的节流

onMounted(() => {
  init()

  // 添加滚动监听作为备用方案
  if (scrollContainer === window) {
    window.addEventListener('scroll', handleScroll, { passive: true })
  } else {
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
  }
})

onUnmounted(() => {
  observer?.disconnect()

  if (scrollThrottleTimeout) {
    clearTimeout(scrollThrottleTimeout)
  }

  if (scrollContainer === window) {
    window.removeEventListener('scroll', handleScroll)
  } else {
    scrollContainer.removeEventListener('scroll', handleScroll)
  }
})

// 监听props变化
watch(
  () => props.targetElement,
  () => {
    observer?.disconnect()
    init()
  },
)

// 暴露方法给父组件
defineExpose({
  scrollToAnchor,
  refresh: init,
})
</script>

<style scoped>
.anchor-toc {
  overflow-y: auto;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  /* 优化滚动性能 */
  will-change: scroll-position;
  transform: translateZ(0);
  /* 硬件加速 */
  backface-visibility: hidden;
  perspective: 1000px;
}

.toc-empty {
  padding: 20px;
  text-align: center;
  color: #999;
}

.toc-list {
  list-style: none;
  margin: 0;
  padding: 8px 0;
  /* 优化渲染性能 */
  contain: layout style;
  /* 硬件加速 */
  transform: translateZ(0);
}

.toc-item {
  cursor: pointer;
  padding: 8px 16px;
  margin: 0;
  transition: all 0.15s ease; /* 减少过渡时间 */
  border-left: 3px solid transparent;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* 优化渲染性能 */
  contain: layout style;
  /* 硬件加速 */
  transform: translateZ(0);
  /* 优化重绘 */
  will-change: transform, background-color, border-color;
}

.toc-item:hover {
  background-color: #f8f9fa;
  border-left-color: #6c757d;
}

.toc-item.active {
  background-color: #e3f2fd;
  border-left-color: #2196f3;
  color: #1976d2;
  font-weight: 500;
}

.toc-text {
  flex: 1;
  font-size: 14px;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 8px;
  /* 优化文本渲染 */
  text-rendering: optimizeSpeed;
}

.toc-level-indicator {
  font-size: 10px;
  color: #999;
  background: #f1f3f4;
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: normal;
  /* 优化渲染 */
  contain: layout style;
}

.toc-item.active .toc-level-indicator {
  background: #2196f3;
  color: white;
}

/* 滚动条样式 */
.anchor-toc::-webkit-scrollbar {
  width: 6px;
}

.anchor-toc::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.anchor-toc::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.anchor-toc::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .toc-item {
    padding: 6px 12px;
  }

  .toc-text {
    font-size: 13px;
  }

  .toc-level-indicator {
    font-size: 9px;
    padding: 1px 4px;
  }
}
</style>

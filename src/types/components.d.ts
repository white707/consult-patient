import cpIcon from '@/components/cpIcon.vue'
import cpNavBar from '@/components/cpNavBar.vue'

declare module 'vue' {
  interface GlobalComponents {
    cpNavBar: typeof cpNavBar
    cpIcon: typeof cpIcon
  }
}

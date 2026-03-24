import cpIcon from '@/components/cpIcon.vue'
import cpNavBar from '@/components/cpNavBar.vue'
import cpRadioButton from '@/components/cpRadioButton.vue'
declare module 'vue' {
  interface GlobalComponents {
    cpNavBar: typeof cpNavBar
    cpIcon: typeof cpIcon
    cpRadioButton: typeof cpRadioButton
  }
}

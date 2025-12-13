<script setup lang="ts">
import { ref, onMounted } from 'vue'

const notifyEnabled = ref(true)

onMounted(async () => {
  const { notifyEnabled: saved } =
    await browser.storage.local.get('notifyEnabled')

  notifyEnabled.value = saved ?? true
})

const toggleNotify = async () => {
  await browser.storage.local.set({
    notifyEnabled: notifyEnabled.value,
  })
}
</script>

<template>
  <div style="padding: 24px; max-width: 600px">
    <h1>⚙ 插件设置</h1>

    <a-switch
      v-model:checked="notifyEnabled"
      @change="toggleNotify"
    />

    <span style="margin-left: 12px">
      启用书签变更通知
    </span>
  </div>
</template>

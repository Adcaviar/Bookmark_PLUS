<script lang="ts" setup>
import { ref } from 'vue'

const githubToken = ref('')
const gistID = ref('')
const gistFileName = ref('BookmarkHub')
const enableNotify = ref(false);

onMounted(async () => {
  optionsStorage.syncForm('#formOptions');
  githubToken.value = (await optionsStorage.getAll()).githubToken
  gistID.value = (await optionsStorage.getAll()).gistID
  gistFileName.value = (await optionsStorage.getAll()).gistFileName
  enableNotify.value = (await optionsStorage.getAll()).enableNotify
})

watch(enableNotify, async (val) => {
  (await optionsStorage.setAll(
    {
        githubToken: githubToken.value,
        gistID: gistID.value,
        gistFileName: gistFileName.value,
        enableNotify: enableNotify.value,
        githubURL: 'https://api.github.com',
    }))
});
</script>

<template>
  <div class="setting">
    <div style="width: 100%;">
      <h1>⚙ 插件设置</h1>
      <form id='formOptions' name='formOptions'>
        <a-space direction="vertical">
          <div class="token">
            <div style="width: 8rem">{{ browser.i18n.getMessage('githubToken') }}</div>
            <a-input-search name="githubToken" v-model:value="githubToken" auto-size :placeholder="browser.i18n.getMessage('githubToken')">
              <template #enterButton>
                <a-button @click="() => { browser.tabs.create({ url: 'https://github.com/settings/tokens/new' }) }">
                  Get Token
                </a-button>
              </template>
            </a-input-search>
          </div>

          <div class="token">
            <div style="width: 8rem">{{ browser.i18n.getMessage('gistID') }}</div>
            <a-input name="gistID" v-model:value="gistID" :placeholder="browser.i18n.getMessage('gistID')" />
          </div>

          <div class="token">
            <div style="width: 8rem">{{ browser.i18n.getMessage('gistFileName') }}</div>
            <a-input name="gistFileName" v-model:value="gistFileName" :placeholder="browser.i18n.getMessage('gistFileName')" />
          </div>

          <div class="token" style="justify-content: flex-start;">
            <div style="width: 6rem">{{ browser.i18n.getMessage('enableNotifications') }}</div>
            <a-switch v-model:checked="enableNotify" />
          </div>
        </a-space>
      </form>
    </div>
  </div>
</template>

<style scoped>
.setting {
  display: flex;
  justify-content: center;
  align-items: self-start;
  padding: 0 1.5rem 1.5rem 1.5rem;
  width: 30rem;
}

.token {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0.5rem 0;
}
</style>
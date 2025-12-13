<template>
  <div class="popup">
    <a-divider style="margin: 1rem 0 1.5rem 0;height: 1px;">BookMark 书签管理</a-divider>

    <!-- 上传书签 -->
    <a-popconfirm title="Are you sure？" @confirm="confirm('update')" @cancel="cancel('update')">
      <template #icon><question-circle-outlined style="color: red" /></template>
      <a-button type="text" :block="true" class="button">
        <CloudUploadOutlined />{{ browser.i18n.getMessage('update') }}
      </a-button>
    </a-popconfirm>

    <!-- 下载书签 -->
    <a-popconfirm title="Are you sure？" @confirm="confirm('update')" @cancel="cancel('update')">
      <template #icon><question-circle-outlined style="color: red" /></template>
      <a-button type="text" :block="true" class="button">
        <CloudDownloadOutlined />{{ browser.i18n.getMessage('download') }}
      </a-button>
    </a-popconfirm>

    <!-- 清空本地书签 -->
    <a-popconfirm title="Are you sure？" @confirm="confirm('update')" @cancel="cancel('update')">
      <template #icon><question-circle-outlined style="color: red" /></template>
      <a-button type="text" :block="true" class="button">
        <ClearOutlined />{{ browser.i18n.getMessage('clear') }}
      </a-button>
    </a-popconfirm>

    <a-divider class="line" />

    <!-- 设置 -->
    <a-button type="text" :block="true" class="button">
      <SettingOutlined />{{ browser.i18n.getMessage('setting') }}
    </a-button>

    <!-- 帮助 -->
    <a-button type="text" :block="true" class="button">
      <QuestionCircleOutlined />{{ browser.i18n.getMessage('help') }}
    </a-button>

    <!-- github -->
    <a-button type="text" :block="true" class="button">
      <GithubOutlined />{{ browser.i18n.getMessage('github') }}
    </a-button>

    <a-button disabled type="text" :block="true" class="button">
      <BookOutlined />
      {{ `${browser.i18n.getMessage('amount')} ${localBookCount}/${CloundBookCount} (本地/云端)` }}
    </a-button>
  </div>
</template>

<script lang="ts" setup>
import { CloudUploadOutlined, CloudDownloadOutlined, ClearOutlined, SettingOutlined, QuestionCircleOutlined, GithubOutlined, BookOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const localBookCount = ref(0)   // 本地书签数量
const CloundBookCount = ref(0)  // 云端书签数量

const confirm = (type:string) => {
  sendMessage(type)
  message.success('Click on Yes');
};

const cancel = (type:string) => {
  message.error('Click on No');
};

onMounted(async () => {
  await getLocalBookMarkCount()
})

const getLocalBookMarkCount = async () => {
  await browser.runtime.sendMessage({ type: 'GetLocalBookCount' })
  const res = await browser.storage.local.get(["localCount"]);
  localBookCount.value = res.localCount
}

const sendMessage = (type: string) => {
  browser.runtime.sendMessage({ type })
}
</script>

<style scoped>
.popup {
  width: 15rem;
  padding: 0.5rem 0;
}

.line {
  height: 1px;
  margin: 0.5rem 0;
  font-size: 1rem;
}

.button {
  text-align: left;
  border-radius: 0px !important;
}
</style>
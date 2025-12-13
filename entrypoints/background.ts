import { BookmarkInfo, OperType } from "@/public/utils/models";
import iconLogo from '@/public/icon/128.png';

export default defineBackground(() => {
  // 浏览器插件本身唯一ID
  // console.log('BookMark 书签管理器', { id: browser.runtime.id });
  browser.runtime.onInstalled.addListener(async (details) => {
    console.log('📦 插件 onInstalled:', details.reason);

    if (details.reason === 'install') {
      // ✅ 第一次安装
      await onFirstInstall();
    }

    if (details.reason === 'update') {
      // 🔄 插件更新
      // console.log('从版本', details.previousVersion, '升级');
    }
  });

  async function onFirstInstall() {
    console.log('🎉 插件首次安装');

    // 1️⃣ 初始化 storage
    await browser.storage.local.set({ localCount: 0 })

    // 2️⃣ 发送欢迎通知
    await browser.notifications.create({
      type: "basic",
      iconUrl: iconLogo,
      title: 'BookMark 书签管理器',
      message: '欢迎使用BookMark 书签管理器 🎉',
    });

    // 打开插件设置页
    browser.runtime.openOptionsPage()

    
    // // 打开引导页
    // browser.tabs.create({
    //   url: browser.runtime.getURL('welcome.html'),
    // });
  }


  browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    console.log(message, 'message')
    const { type } = message
    if (type == 'GetLocalBookCount') {
      refreshLocalCount()
      sendResponse(true)
    }

    // // 获取当前活动的页面
    // const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

    // // 转发消息给当前活动的页面,通过 content 进行监听
    // browser.tabs.sendMessage(tab.id,message).then(response =>{
    //   console.log(response,'response')
    // })
  })






  let curOperType = OperType.NONE;
  browser.bookmarks.onCreated.addListener((id, info) => {
    if (curOperType === OperType.NONE) {
      // console.log("onCreated", id, info)
      browser.action.setBadgeText({ text: "!" });
      browser.action.setBadgeBackgroundColor({ color: "#F00" });
      refreshLocalCount();
    }
  });
  browser.bookmarks.onChanged.addListener((id, info) => {
    if (curOperType === OperType.NONE) {
      // console.log("onChanged", id, info)
      browser.action.setBadgeText({ text: "!" });
      browser.action.setBadgeBackgroundColor({ color: "#F00" });
    }
  })
  browser.bookmarks.onMoved.addListener((id, info) => {
    if (curOperType === OperType.NONE) {
      // console.log("onMoved", id, info)
      browser.action.setBadgeText({ text: "!" });
      browser.action.setBadgeBackgroundColor({ color: "#F00" });
    }
  })
  browser.bookmarks.onRemoved.addListener((id, info) => {
    if (curOperType === OperType.NONE) {
      // console.log("onRemoved", id, info)
      browser.action.setBadgeText({ text: "!" });
      browser.action.setBadgeBackgroundColor({ color: "#F00" });
      refreshLocalCount();
    }
  })

  async function refreshLocalCount() {
    const BookTree: BookmarkInfo[] = await getBookrTree()
    const count = getBookmarkCount(BookTree)
    await browser.storage.local.set({ localCount: count });
  }


  async function getBookrTree() {
    return await browser.bookmarks.getTree()
  }

  function getBookmarkCount(bookmarkList: BookmarkInfo[] | undefined) {
    let count = 0;
    if (bookmarkList) {
      bookmarkList.forEach(c => {
        if (c.url) {
          count = count + 1;
        }
        else {
          count = count + getBookmarkCount(c.children);
        }
      });
    }
    return count;
  }
});

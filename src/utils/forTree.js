/**
 * 生成菜单数据
 */
function generateMenus() {
  const funcs = JSON.parse(sessionStorage.getItem("funcs") || "");
  const srcMenus = [];
  const targetMenus = [];
  let funcBtns = [];
  if (Array.isArray(funcs)) {
    funcs.forEach((ele) => {
      if (ele["isIntf"] === "0") {
        srcMenus.push(ele);
      }
    });
  }
  srcMenus.forEach((ele) => {
    treeDataRecursive(ele, targetMenus);
  });

  let menus = targetMenus;
  // 本地缓存
  sessionStorage.setItem("accessBtns", JSON.stringify(funcBtns));

  return menus;

  function treeDataRecursive(ele, treeData) {
    const treeNode = {
      index: "/" + ele["url"],
      title: ele["funcName"],
      icon: ele["imgUrl"],
      selected: false,
      subs: [],
    };
    treeData.push(treeNode);
    if (ele.children) {
      treeNode.subs = [];
      for (let i = 0; i < ele.children.length; i++) {
        if (ele.children[i]["isIntf"] !== "0") {
          // 保存按钮权限
          if (ele.children[i]["url"]) {
            funcBtns.push(ele.children[i]["url"]);
          }
          ele.children.splice(i, 1);
          i = i - 1;
          continue;
        }
        treeDataRecursive(ele.children[i], treeNode.subs);
      }
    }
  }
}

export { generateMenus };

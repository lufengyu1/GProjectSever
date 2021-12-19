//将数组转成嵌套的json
function buildTree(arr) {
    let temp = {}
    let tree = {}
        // 数组转 键值对
    arr.forEach(item => {
        temp[item.id] = item
    })

    let tempKeys = Object.keys(temp)
    tempKeys.forEach(key => {
            // 获取当前项
            let item = temp[key]
                // 当前项 pId
            let _itemPId = item.pid
                // 获取父级项
            let parentItemByPid = temp[_itemPId]
            if (parentItemByPid) {
                if (!parentItemByPid.children) {
                    parentItemByPid.children = []
                }
                parentItemByPid.children.push(item)
            } else {
                tree[item.id] = item
            }
        })
        // 对象转数组并返回
    return Object.keys(tree).map(key => tree[key])
}
module.exports = buildTree;
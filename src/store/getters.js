const book = {
    //文件名称
    fileName: state => state.book.fileName,
    //菜单是否可见
    menuVisible: state => state.book.menuVisible,
    //设置是否可见
    settingVisible: state => state.book.settingVisible,
    //默认字体大小
    defaultFontSize: state => state.book.defaultFontSize,
    //默认字体
    defaultFontFamily: state => state.book.defaultFontFamily,
    //字体设置是否可见
    fontFamilyVisible: state => state.book.fontFamilyVisible,
    //默认样式
    defaultTheme: state => state.book.defaultTheme,
    //电子书是否可见
    bookAvailable: state => state.book.bookAvailable,
    //电子书阅读进度
    progress: state => state.book.progress,
    //电子书位置
    section: state => state.book.section,
    isPaginating: state => state.book.isPaginating,
    currentBook: state => state.book.currentBook,
    //电子书导航栏
    navigation: state => state.book.navigation,
    //电子书封面
    cover: state => state.book.cover,
    metadata: state => state.book.metadata,
    paginate: state => state.book.paginate,
    pagelist: state => state.book.pagelist,
    //下拉坐标偏移量
    offsetY: state => state.book.offsetY,
    //当前页是否存在书签
    isBookmark: state => state.book.isBookmark,
    hotSearchOffsetY: state => state.store.hotSearchOffsetY,
    flapCardVisible: state => state.store.flapCardVisible,
    isEditMode: state => state.store.isEditMode,
    shelfList: state => state.store.shelfList,
    shelfSelected: state => state.store.shelfSelected,
    shelfTitleVisible: state => state.store.shelfTitleVisible,
    shelfCategory: state => state.store.shelfCategory,
    currentType: state => state.store.currentType
}

export default book

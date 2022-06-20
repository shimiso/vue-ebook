import { mapGetters, mapActions } from 'vuex'
import { themeList,addCss,removeAllCss} from './book'
import { gotoBookDetail, appendAddToShelf, computeId, removeAddFromShelf } from './store'
import {getBookmark, saveLocation, getBookShelf, saveBookShelf, getReadTime} from './localStorage'
import { shelf } from '../api/store'

export const storeShelfMixin = {
    computed: {
        ...mapGetters([
            'isEditMode',
            'shelfList',
            'shelfSelected',
            'shelfTitleVisible',
            'offsetY',
            'shelfCategory',
            'currentType'
        ])
    },
    methods: {
        ...mapActions([
            'setIsEditMode',
            'setShelfList',
            'setShelfSelected',
            'setShelfTitleVisible',
            'setOffsetY',
            'setShelfCategory',
            'setCurrentType'
        ]),
        showBookDetail(book) {
            gotoBookDetail(this, book)
        },
        getCategoryList(title) {
            this.getShelfList().then(() => {
                const categoryList = this.shelfList.filter(book => book.type === 2 && book.title === title)[0]
                this.setShelfCategory(categoryList)
            })
        },
        getShelfList() {
            let shelfList = getBookShelf()
            if (!shelfList) {
                shelf().then(response => {
                    if (response.status === 200 && response.data && response.data.bookList) {
                        shelfList = appendAddToShelf(response.data.bookList)
                        saveBookShelf(shelfList)
                        return this.setShelfList(shelfList)
                    }
                })
            } else {
                return this.setShelfList(shelfList)
            }
        },
        /*moveOutOfGroup(f) {
            this.setShelfList(this.shelfList.map(book => {
                if (book.type === 2 && book.itemList) {
                    book.itemList = book.itemList.filter(subBook => !subBook.selected)
                }
                return book
            })).then(() => {
                const list = computeId(appendAddToShelf([].concat(
                    removeAddFromShelf(this.shelfList), ...this.shelfSelected)))
                this.setShelfList(list).then(() => {
                    this.simpleToast(this.$t('shelf.moveBookOutSuccess'))
                    if (f) f()
                })
            })
        }*/
    }
}

//书城home页面mixin
export const storeHomeMixin = {
    computed: {
        ...mapGetters([
            'offsetY',
            'hotSearchOffsetY',
            'flapCardVisible'
        ])
    },
    methods: {
        ...mapActions([
            'setOffsetY',
            'setHotSearchOffsetY',
            'setFlapCardVisible'
        ]),
        showBookDetail(book) {
            gotoBookDetail(this, book)
        }
    }
}

//阅读器mixin
export const ebookMixin = {
    computed: {
        ...mapGetters([
            'fileName',
            'menuVisible',
            'settingVisible',
            'defaultFontSize',
            'defaultFontFamily',
            'fontFamilyVisible',
            'defaultTheme',
            'bookAvailable',
            'progress',
            'section',
            'isPaginating',
            'currentBook',
            'navigation',
            'cover',
            'metadata',
            'paginate',
            'pagelist',
            'offsetY',
            'isBookmark']),
        themeList() {
            return themeList(this)
        },
        getSectionName() {
            /*if(this.section){
                const  sectionInfo = this.currentBook.section(this.section);
                if(sectionInfo && sectionInfo.href){
                    const navigation = this.currentBook.navigation.get(sectionInfo.href);
                    if(navigation && navigation.label) {
                        return navigation.label;
                    }

                }
            }*/
            return this.section?this.navigation[this.section].label:'';
        }
    },
    methods:{
        ...mapActions([
            'setFileName',
            'setMenuVisible',
            'setSettingVisible',
            'setDefaultFontSize',
            'setDefaultFontFamily',
            'setFontFamilyVisible',
            'setDefaultTheme',
            'setBookAvailable',
            'setProgress',
            'setSection',
            'setIsPaginating',
            'setCurrentBook',
            'setNavigation',
            'setCover',
            'setMetadata',
            'setPaginate',
            'setPagelist',
            'setOffsetY',
            'setIsBookmark']),
        initGlobalStyle() {
            removeAllCss()
            switch (this.defaultTheme) {
                case 'Default':
                    addCss('/bookApi/theme/theme_default.css')
                    break
                case 'Eye':
                    addCss('/bookApi/theme/theme_eye.css')
                    break
                case 'Gold':
                    addCss('/bookApi/theme/theme_gold.css')
                    break
                case 'Night':
                    addCss('/bookApi/theme/theme_night.css')
                    break
                default:
                    addCss('/bookApi/theme/theme_default.css')
                    break
            }
        },

        /**
         * 1.保存当前阅读位置
         * 2.判断当前页是否为书签页面
         */
        refreshLocation(){
            const currentLocation = this.currentBook.rendition.currentLocation()
            if(currentLocation && currentLocation.start){
                const startCfi = currentLocation.start.cfi
                const progress = this.currentBook.locations.percentageFromCfi(startCfi)
                this.setProgress(Math.floor(progress * 100))
                this.setSection(currentLocation.start.index)
                saveLocation(this.fileName, startCfi)

                const bookmark = getBookmark(this.fileName)
                if (bookmark) {
                    if (bookmark.some(item => item.cfi === startCfi)) {
                        this.setIsBookmark(true)
                    } else {
                        this.setIsBookmark(false)
                    }
                } else {
                    this.setIsBookmark(false)
                }
                if (this.pagelist) {
                    const totalPage = this.pagelist.length
                    const currentPage = currentLocation.start.location
                    if (currentPage && currentPage > 0) {
                        this.setPaginate(currentPage + ' / ' + totalPage)
                    } else {
                        this.setPaginate('')
                    }
                } else {
                    this.setPaginate('')
                }
            }
        },
        display(target, cb) {
            if (target) {
                this.currentBook.rendition.display(target).then(() => {
                    this.refreshLocation()
                    if (cb) cb()
                })
            } else {
                this.currentBook.rendition.display().then(() => {
                    this.refreshLocation()
                    if (cb) cb()
                })
            }
        },
        hideTitleAndMenu() {
            this.setMenuVisible(false)
            this.setSettingVisible(-1)
            this.setFontFamilyVisible(false)
        },
        getReadTimeText() {
            return this.$t('book.haveRead').replace('$1', this.getReadTimeByMinute(this.fileName))
        },
        getReadTimeByMinute(fileName) {
            const readTime = getReadTime(fileName)
            if (!readTime) {
                return 0
            } else {
                return Math.ceil(readTime / 60)
            }
        }
    }
}
import {
    Button,
    Dialog,
    DatePicker,
    Select,
    Option,
    Radio,
    checkbox,
    MessageBox,
    Form,
    FormItem,
    Input,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Tabs,
    TabPane
} from 'element-ui';

const element = {
    install: function(Vue){
        Vue.use(Button)
        Vue.use(Dialog)
        Vue.use(DatePicker)
        Vue.use(Select)
        Vue.use(Option)
        Vue.use(Radio)
        Vue.use(checkbox)
        Vue.prototype.$msgbox = MessageBox;
        Vue.use(Form)
        Vue.use(FormItem)
        Vue.use(Input)
        Vue.use(Menu)
        Vue.use(Submenu)
        Vue.use(MenuItem)
        Vue.use(MenuItemGroup)
        Vue.use(Tabs)
        Vue.use(TabPane)
    }
}

export default element
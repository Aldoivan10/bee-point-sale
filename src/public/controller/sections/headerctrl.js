const $index = window.parent

const userModel = new UserModel()
const userView = new UserView(
    $name,
    $headerBody,
    $index.$indexBody,
    $index.$tabsContent,
    $index.$pass,
    $index.$user,
    $index.$sendUser
)
const userCtrl = new UserController(userModel, userView, $index.$login)

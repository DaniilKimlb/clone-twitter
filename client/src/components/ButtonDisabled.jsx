import { Button } from '../styled'

const ButtonDisabled = ({ children, ...props }) => {
    return Object.keys(props).every((el) => props[el]) ? (
        <Button>{children}</Button>
    ) : (
        <Button disabled>{children}</Button>
    )
}
export default ButtonDisabled

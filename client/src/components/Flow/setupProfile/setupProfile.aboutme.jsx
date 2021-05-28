import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl } from '../../../styled'
import { Main } from '../flow.styled'

const UpdateAboutMe = ({
    changeAboutMe,
    aboutMe,
    setIsChangeSetupPasswordComplete,
}) => {
    const { register, watch, handleSubmit } = useForm({
        defaultValues: { aboutMe },
    })
    const aboutMeField = watch('aboutMe')
    const onSubmit = useCallback(
        async (formObj) => {
            try {
                if (formObj.aboutMe) {
                    await changeAboutMe(formObj.aboutMe)
                }
                setIsChangeSetupPasswordComplete(true)
            } catch (error) {}
        },
        [changeAboutMe, setIsChangeSetupPasswordComplete]
    )
    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Main>
                <h1>Опишите себя</h1>
                <p>
                    Чем вы отличаетесь от других? Особо не раздумывайте, просто
                    напишите что придет в голову.
                </p>
                <FormControl type="textarea">
                    <textarea
                        {...register('aboutMe')}
                        id="AboutMe"
                        required
                        maxLength="160"
                    />
                    <label htmlFor="AboutMe">Расскажите о себе</label>
                </FormControl>
                <Button
                    pos="absolute"
                    width="80px"
                    top="10px"
                    pad="7px 0"
                    right="15px"
                    fw="700"
                    hover={!!aboutMeField}
                    color={!aboutMeField ? '#1da1f2' : '#fff'}
                    bgc={!aboutMeField ? '#000' : '#1da1f2'}
                >
                    {aboutMeField ? 'Далее' : 'Пропустить'}
                </Button>
            </Main>
        </form>
    )
}
export default UpdateAboutMe

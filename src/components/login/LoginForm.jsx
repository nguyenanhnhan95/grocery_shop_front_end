import { memo, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from "react-redux";
import { handleRedirectAdmin } from "../../utils/commonUtils";
import { CONST_LOGIN, EMPTY_STRING, FETCH_LOGIN, KEEP_LOGIN, LINK_DOMAIN, LOGIN, LOGIN_LOADING, SLASH } from "../../utils/commonConstants";
import { loginFormAuth } from "../../redux/slice/login/login";
function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [keepLogin, setKeepLogin] = useState(false)
    const { status } = useSelector((state) => state.loginForm)
    const dispatch = useDispatch();
   
    const handleLogin = async (loginRequest, setErrors) => {
        try {
            if (status === FETCH_LOGIN.FETCH_LOGIN_INITIAL) {              
                await dispatch(loginFormAuth({ ...loginRequest, flagKeep: keepLogin })).unwrap();
                Cookies.remove(CONST_LOGIN.keepLogin, { domain: LINK_DOMAIN.domain, path: SLASH });
                handleRedirectAdmin()
            }
        } catch (error) {
            console.log(error)
            setErrors(error.result)
        }
    }
    const handleKeepLogin = (currentKeepLogin) => {
        if (currentKeepLogin) {
            setKeepLogin(false);
            Cookies.remove(CONST_LOGIN.keepLogin, { domain: LINK_DOMAIN.domain, path: SLASH });
            Cookies.set(CONST_LOGIN.keepLogin, false, { domain: LINK_DOMAIN.domain, path: EMPTY_STRING })
        } else {
            Cookies.remove(CONST_LOGIN.keepLogin, { domain: LINK_DOMAIN.domain, path: SLASH });
            Cookies.set(CONST_LOGIN.keepLogin, true, { domain: LINK_DOMAIN.domain, path: EMPTY_STRING })
            setKeepLogin(true);
        }
    }
    return (
        <>
            <Formik initialValues={{
                nameLogin: "",
                password: "",
            }}
                validationSchema={yup.object({
                    nameLogin: yup.string().required("Chưa nhập email :"),
                    password: yup.string().required("Chưa nhập mật khẩu")
                })}
                onSubmit={(value, { setErrors }) =>
                    handleLogin(value, setErrors)
                }
            >
                <Form>
                    <div className="form-login">
                        <ErrorMessage className="form-text form-error" name='notificationFail' component='div' />
                        <div className="mb-3 form-login-input">
                            <label htmlFor="nameLogin" className="form-label">Tên đăng nhập</label>
                            <Field type="text" name="nameLogin" className="form-control" id="nameLogin" autoComplete="off" placeholder="join" />
                            <ErrorMessage className="form-text form-error" name='nameLogin' component='div' />
                        </div>
                        <div className="mb-3 form-password form-login-input">
                            <label htmlFor="password" className="form-label">Mật khẩu</label>
                            <Field type={showPassword ? 'text' : 'password'} name="password" className="form-control " autoComplete="username password" id="password" placeholder="············" />
                            <ErrorMessage name='password' className="form-text form-error" component='div' />
                            {showPassword ?
                                <i className="fa-solid fa-eye" onClick={() => setShowPassword(false)} />
                                :
                                <i className="fa-solid fa-eye-slash" onClick={() => setShowPassword(true)}></i>
                            }
                        </div>
                        <div className="mb-3 form-check d-flex align-items-center">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" defaultChecked={keepLogin}
                                onChange={() => handleKeepLogin(keepLogin)} />
                            <label className="form-check-label" htmlFor="exampleCheck1">{KEEP_LOGIN}</label>
                        </div>
                        <button type="submit" className="form-submit mb-3" role="status">
                            {status !== FETCH_LOGIN.FETCH_LOGIN_LOADING ?
                                LOGIN
                                : <div className="d-flex justify-content-center ">
                                    <div className="spinner-border " role="status">
                                        <span className="visually-hidden"></span>
                                    </div><span>{LOGIN_LOADING}</span>
                                </div>}

                        </button>
                    </div>
                </Form>
            </Formik>
        </>
    )
}
export default memo(LoginForm);
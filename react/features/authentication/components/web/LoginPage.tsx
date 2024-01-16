import React, { Component } from 'react';
import { WithTranslation } from 'react-i18next';
import { connect as reduxConnect, useDispatch } from 'react-redux';

import { translate } from '../../../base/i18n/functions';

import Navbar from '../../../welcome/components/Navbar';
import Footer from '../../../welcome/components/Footer';
import { Box, Button, TextField } from '@mui/material';

/**
 * The type of the React {@code Component} props of {@link LoginPage}.
 */
interface IProps extends WithTranslation {
}

/**
 * The type of the React {@code Component} state of {@link LoginPage}.
 */
interface IState {

    /**
     * The user entered password for logging in.
     */
    password: string;

    /**
     * The email entered for logging in.
     */
    email: string;
}

/**
 * Component that renders the login in conference dialog.
 *
 *  @returns {React$Element<any>}
 */
class LoginPage extends Component<IProps, IState> {
    /**
     * Initializes a new {@code LoginPage} instance.
     *
     * @inheritdoc
     */
    constructor(props: IProps) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this._onLogin = this._onLogin.bind(this);
        this._onEmailChange = this._onEmailChange.bind(this);
        this._onPasswordChange = this._onPasswordChange.bind(this);
        this._onFormSubmit = this._onFormSubmit.bind(this);
    }

    /**
     * Notifies this LoginPage that the login button (OK) has been pressed by
     * the user.
     *
     * @private
     * @returns {void}
     */
    _onLogin() {
        const dispatch = useDispatch();
        const { password, email } = this.state;

        // TODO: Integrate with Auth API
    }

    /**
     * Callback for the onChange event of the field.
     *
     * @param {string} value - The static event.
     * @returns {void}
     */
    _onPasswordChange(event: any) {
        this.setState({
            password: event.target.value
        });
    }

    /**
     * Callback for the onChange event of the username input.
     *
     * @param {string} value - The new value.
     * @returns {void}
     */
    _onEmailChange(event: any) {
        this.setState({
            email: event.target.value
        });
    }

    /**
     * Prevents submission of the form and delegates login logic.
     *
     * @param {Event} event - The HTML Event which details the form submission.
     * @private
     * @returns {void}
     */
    _onFormSubmit(event: React.FormEvent) {
        event.preventDefault();
        console.log('Submit login form', this.state);

        // TODO: Complete this login logic
    }

    /**
     * Implements {@Component#render}.
     *
     * @inheritdoc
     */
    render() {
        const { t } = this.props;

        const { email, password } = this.state;

        return (
            <div
                className='welcome login'
                id='welcome_page'
            >
                <div className='banner d-flex flex-column justify-between'>
                    <Navbar />
                    <Footer />
                </div>
                <div className='action-wrapper flex-column d-flex justify-between align-center'>
                    <div className='d-flex flex-column justify-center align-center flex-grow-1'>
                        <div className='login-container'>
                            <img
                                alt='powered-by'
                                src='images/powered-by.svg'
                                width={180}
                            />
                            <div className="content__mobile-setting">
                                <h1 className="content__title">Đăng nhập</h1>
                            </div>
                            <div className="mb-2 mt-6 form-wrapper">
                                <div className = 'form'>
                                    <Box component="form" onSubmit={this._onFormSubmit} noValidate sx={{ mt: 1 }}>
                                        <TextField
                                            margin="normal"
                                            value={email}
                                            required
                                            fullWidth
                                            id="email"
                                            label="Địa chỉ Email"
                                            name="email"
                                            autoComplete="email"
                                            onChange = { this._onEmailChange }
                                            autoFocus
                                        />
                                        <TextField
                                            margin="normal"
                                            value={password}
                                            required
                                            fullWidth
                                            name="password"
                                            label={t('dialog.password')}
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            onChange = { this._onPasswordChange }
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            size='large'
                                            sx={{ mt: 3, mb: 2 }}
                                            variant="contained"
                                            color='primary'
                                        >
                                            {t('dialog.login')}
                                        </Button>
                                    </Box>
                                    {/* <form onSubmit = { this._onFormSubmit } className='d-flex flex-column align-center'>
                                        <input
                                            aria-disabled = 'false'
                                            aria-label = {t('dialog.user')}
                                            autoFocus = { true }
                                            className = 'username-input'
                                            onChange = { this._onEmailChange }
                                            // pattern = { ROOM_NAME_VALIDATE_PATTERN_STR }
                                            placeholder = { 'Email' }
                                            title = { t('welcomepage.roomNameAllowedChars') }
                                            type = 'text'
                                            value = { username }
                                        />
                                        <input
                                            aria-disabled = 'false'
                                            aria-label = {t('dialog.password')}
                                            className = 'password-input'
                                            name='password'
                                            onChange = { this._onPasswordChange }
                                            // pattern = { ROOM_NAME_VALIDATE_PATTERN_STR }
                                            placeholder = { 'Mật khẩu' }
                                            type = 'text'
                                            value = { password }
                                        />
                                    </form> */}
                                    {/* <Button
                                        onClick = { this._onFormSubmit }
                                        id = 'login_button'
                                        type = { BUTTON_TYPES.SECONDARY }
                                        labelKey = { t('dialog.login') }
                                    /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='powered-by'>
                        <div className='d-mobile'>
                            <img
                                className='red-logo'
                                alt='powered-by'
                                src='images/Logo-Digital.svg'
                                width={180}
                            />
                            <p className='highlight'>CƠ QUAN CỦA TÒA ÁN NHÂN DÂN TỐI CAO</p>
                            <p>Trụ sở Tòa soạn: 262 Đội Cấn, Ba Đình, Hà Nội</p>
                        </div>
                        <p>Powered By Sky Media Group</p>
                    </div>
                </div>
            </div>

        );
    }
}

export default translate(LoginPage);

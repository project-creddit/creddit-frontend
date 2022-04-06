import { Formik } from 'formik';
import type { NextPage } from 'next';
import Link from 'next/link';
import { object, string } from 'yup';
import Button from '../components/Button';
import Input from '../components/Input';
import Layout from '../components/Layout';
import SocialLoginButtons from '../components/SocialLoginButtons';
import { ERRORS } from '../constants';
import styles from '../styles/Login.module.css';

const Login: NextPage = () => {
  return (
    <Layout type="account" title="creddit: 로그인">
      <div className={styles.loginContainer}>
        <h1>로그인</h1>
        <LoginForm
          onSubmit={(values) => {
            console.log(values);
          }}
        />
        <SocialLoginButtons />
        <div className={styles.nonLoginContainer}>
          <span className={styles.forgotPW}>
            <Link href="/find-password">
              <a aria-label="비밀번호 찾기">비밀번호를 잊으셨습니까?</a>
            </Link>
          </span>
          <span className={styles.nonAccount}>
            아직 회원이 아니신가요?
            <Link href="/signup">
              <a>회원가입</a>
            </Link>
          </span>
        </div>
      </div>
    </Layout>
  );
};

type LoginFormProps = {
  onSubmit: (values: { email: string; password: string }) => void;
};

export function LoginForm({ onSubmit }: LoginFormProps) {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={object({
        email: string()
          .email(ERRORS.emailInvalid)
          .required(ERRORS.emailRequired),
        password: string().required(ERRORS.passwordRequired),
      })}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            value={values.email}
            onChange={handleChange}
            placeholder="이메일"
            type="email"
            name="email"
            onBlur={handleBlur}
            error={touched.email && errors.email}
          />

          <Input
            value={values.password}
            onChange={handleChange}
            placeholder="비밀번호"
            type="password"
            name="password"
            onBlur={handleBlur}
            error={touched.password && errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            data-testid="submitButton"
          >
            로그인
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default Login;
import { Formik } from 'formik';
import type { NextPage } from 'next';
import { object, string } from 'yup';
import Button from '../components/Button';
import Input from '../components/Input';
import Layout from '../components/Layout';
import { ERRORS } from '../constants';
import styles from '../styles/ResetPassword.module.css';

const ResetPassword: NextPage = () => {
  return (
    <Layout type="account" title="creddit: 비밀번호 찾기">
      <div className={styles.resetPasswordContainer}>
        <h1>비밀번호 재설정</h1>
        <ResetPasswordForm
          onSubmit={(values) => {
            console.log(values);
          }}
        />
      </div>
    </Layout>
  );
};

type ResetPasswordFormProps = {
  onSubmit: (values: {
    newPassword: string;
    newPasswordConfirm: string;
  }) => void;
};

export function ResetPasswordForm({ onSubmit }: ResetPasswordFormProps) {
  return (
    <Formik
      initialValues={{ newPassword: '', newPasswordConfirm: '' }}
      validationSchema={object({
        newPassword: string().required(ERRORS.newPasswordRequired),
        newPasswordConfirm: string().required(
          ERRORS.newPasswordConfirmRequired
        ),
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
            value={values.newPassword}
            onChange={handleChange}
            placeholder="새 비밀번호"
            type="password"
            name="newPassword"
            onBlur={handleBlur}
            error={touched.newPassword && errors.newPassword}
          />
          <Input
            value={values.newPasswordConfirm}
            onChange={handleChange}
            placeholder="새 비밀번호 확인"
            type="password"
            name="newPasswordConfirm"
            onBlur={handleBlur}
            error={touched.newPasswordConfirm && errors.newPasswordConfirm}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            data-testid="submitButton"
          >
            확인
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default ResetPassword;
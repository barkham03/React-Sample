import React from 'react';
import { useFormik, ErrorMessage, Field, Form , Formik, useField} from 'formik';
import * as Yup from 'yup';
import ReactDOM from 'react-dom';
import { type } from 'os';
import styled from "@emotion/styled";
import "./styles.css";
import "./styles-custom.css";
import axios from 'axios';

// const validate = values => {
//     const errors = {};
//     if (!values.firstName) { ErrorMessage.firstName = 'Required'
//     } else if(values.firstName.length > 15) {  errors.firstName = 'Must be 15 characters or less'; }
//     if (!values.lastName) { ErrorMessage.lastName = 'Required'
//     } else if(values.lastName.length > 20) {  errors.lastName = 'Must be 20 characters or less'; }
//     if (!values.email) { ErrorMessage.email = 'Required'
//     } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {  errors.email = 'Invalid email'; }
//     console.log(errors);
//     return errors;
// }

// const FormikContext = React.createContext({});

// export const Formik = ({children, ...props}) => {
//     console.log(children);
//     console.log(props);
//     const formikStateAndHelpers = useFormik(props);
//     console.log(formikStateAndHelpers);
//     return(
//         <FormikContext.Provider value={formikStateAndHelpers}>
//             {typeof children === 'function' ? 
//             children(formikStateAndHelpers) : children}
//         </FormikContext.Provider>
//     )
// }

// const Signup = () => {
    // const formik = useFormik({
    //     initialValues: {
    //         email: '',
    //         firstName: '',
    //         lastName: '',
    //     },
    //     // validate,
    //     validationSchema : Yup.object({
    //         firstName: Yup.string()
    //             .max(15, 'Must be 15 characters or less')
    //             .required('Required'),
    //         lastName: Yup.string()
    //             .max(20, 'Must be 20 characters or less')
    //             .required('Required'),
    //         email: Yup.string()
    //             .email('Invalid Email')
    //             .required('Required')
    //     }),
    //     onSubmit: values => {
    //         alert(JSON.stringify(values, null, 2));
    //     }
    // });
    // const propfrom = {...formik.getFieldProps('firstName')};
    // console.log(propfrom);
    // return(
        // <form onSubmit={formik.handleSubmit}>
        //     <label htmlFor="firstName">Name</label>
        //     <input id="firstName" type="text" value={formik.values.firstName} 
        //     {...formik.getFieldProps('firstName')}/><br />
        //     {formik.touched.firstName && formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null }

        //     <label htmlFor="firstName">Surname</label>
        //     <input id="lastName" type="text" value={formik.values.lastName} 
        //     {...formik.getFieldProps('lastName')} /><br />
        //     {formik.touched.lastName && formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}

        //     <label htmlFor="email">Email</label>
        //     <input id="email" type="email" value={formik.values.email} 
        //     {...formik.getFieldProps('email')} /><br />
        //     {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
        //     <button type="submit">Submit</button>
        // </form>
    // )

    //Formik component using
    // return(
    //     <Formik 
    //         initialValues = {{firstName: '', lastName: '', email: ''}}
    //          validationSchema = { Yup.object({
    //             firstName: Yup.string()
    //                 .max(15, 'Must be 15 characters or less')
    //                 .required('Required'),
    //             lastName: Yup.string()
    //                 .max(20, 'Must be 20 characters or less')
    //                 .required('Required'),
    //             email: Yup.string()
    //                 .email('Invalid Email')
    //                 .required('Required')
    //         }) }
    //         onSubmit = { (values, { setSubmitting }) => {
    //             setTimeout(() => {
    //                 alert(JSON.stringify(values, null, 2));
    //                 setSubmitting(false);
    //             }, 400)
    //         }}
    //     >
    //         <Form>
    //             <label htmlFor="firstName">Name</label>
    //             <Field name="firstName" type="text" />
    //             <ErrorMessage name="firstName" />
    //             <label htmlFor="lastName">Surname</label>
    //             <Field name="lastName" type="text" />
    //             <ErrorMessage name="lastName" />
    //             <label htmlFor="email">Email</label>
    //             <Field name="email" type="email" />
    //             <ErrorMessage name="email" />
    //             <button type="submit">Submit</button>
    //         </Form>
    //     </Formik>
    // );
    // {formik => (
//                 <form onSubmit={formik.handleSubmit}>
//                  <label htmlFor="firstName">Name</label>
//                  <input id="firstName" type="text" value={formik.values.firstName} 
//                  {...formik.getFieldProps('firstName')}/><br />
//                  {formik.touched.firstName && formik.errors.firstName ? ( <div>{formik.errors.firstName}</div>) : null }
     
//                  <label htmlFor="firstName">Surname</label>
//                  <input id="lastName" type="text" value={formik.values.lastName} 
//                  {...formik.getFieldProps('lastName')} /><br />
//                  {formik.touched.lastName && formik.errors.lastName ? ( <div>{formik.errors.lastName}</div>) : null }
     
//                  <label htmlFor="email">Email</label>
//                  <input id="email" type="email" value={formik.values.email} 
//                  {...formik.getFieldProps('email')} /><br />
//                  {formik.touched.email && formik.errors.email ? (<div>{formik.errors.email}</div>) : null }
//                  <button type="submit">Submit</button>
//              </form>
//             )}
// };


const MyStyledInput = ({label, ...props}) => {
    console.log(label);
    console.log(props);

    const[field, meta] = useField(props);
    console.log(field);
    console.log(meta);
    return(
        <>
            <label htmlFor={props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (<div className="error">{meta.error}</div>) : null }
        </>
    )
};

const MyCheckbox = ({children, ...props}) => {
    console.log(children);
    const[field, meta] = useField({...props, type: 'checkbox' })
    return(
        <>
            <label htmlFor={props.name}>
                <input className="checkbox" type="checkbox" {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? (<div className="error">{meta.error}</div>) : null } 
        </>
    )
}

const StyledSelect = styled.select `
    color: var(--blue) 
`;

const StyledErrorMessage = styled.div `
  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
    font-size: 12px;
    color: var(--red-600);
    width: 400px;
    margin-top: 0.25rem;
    &:before {
        content: "❌ ";
        font-size: 10px;
    }
      @media (prefers-color-scheme: dark) {
        color: var(--red-300);
    }
`;

const StyledLabel = styled.label`
  margin-top: 1rem;
`;

const MySelect = ({label, ...props}) => {
    const[field, meta] = useField(props);
    return(
        <>
            <StyledLabel htmlFor={props.name}>{label}</StyledLabel>
            <StyledSelect {...field} {...props} />
            {meta.touched && meta.error ? (<StyledErrorMessage>{meta.error}</StyledErrorMessage>) : null }
        </>
    )

}

const handleSubmit = (values) => {
    console.log(values);
    axios.post('http://localhost:4000/users/signin', values).then(response => {
        console.log(response);
    })
}
const Signup = () => {
    return(
            <Formik 
                initialValues = {{firstName: '', lastName: '', email: '', password:'', jobType: '', acceptedTerms: ''}}
                 validationSchema = { Yup.object({
                    firstName: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    lastName: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                    email: Yup.string()
                        .email('Invalid Email')
                        .required('Required'),
                    password: Yup.string()
                        .min(7, 'Must be atleast 7 characters')
                        .required('Required'),
                    jobType: Yup.string()
                        .oneOf(['designer', 'engineer'], 'Invalid Job Type') 
                        .required('Required')
                }) }
                onSubmit = { (values, { setSubmitting }) => {
                    console.log(values);
                    console.log(setSubmitting);
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                        handleSubmit(values);
                    }, 400)
                }}
            >
                <Form >
                    <MyStyledInput label="First Name" name="firstName" type="text" placeholder="Enter Name" /><br />

                    <MyStyledInput label="Last Name" name="lastName" type="text" placeholder="Enter Last Name" /><br />

                    <MyStyledInput label="Email" name="email" type="email" placeholder="Enter mail address" /><br />

                    <MyStyledInput label="Password" name="password" type="password" placeholder="Enter password" /><br />
                    
                    <MyCheckbox name="acceptedTerms">
                        I accept the terms and conditions
                    </MyCheckbox><br />

                    <MySelect label="Job Type" name="jobType">
                        <option value="">Select a Job Type</option>
                        <option value="designer">Designer</option>
                        <option value="engineer">Engineer</option>
                    </MySelect><br />

                    <button type="submit" onSubmit={Formik.handleSubmit}>Submit</button>
                </Form>
            </Formik>
    )
}

function SignIn() {
    return <Signup />
}

export default SignIn;


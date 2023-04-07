import { useState } from "react";
import axios from "axios";
import * as yup from "yup";


const emptyForm = {
    name: "",
    email: "",
    pass: "",
    term: true,
};

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  pass: yup.string().min(8).max(32).required(),
});

export default function Form(props) {
    const [formData, setFormData] = useState(emptyForm);
    const [hataMesaji, setHataMesaji] = useState('')

     async function submitHandler(e) {
        e.preventDefault();
        
        try {
            const user = await schema.validate(formData)
        } catch (err) {
            setHataMesaji(err.message);
            return;
        }
        setHataMesaji("");

        axios
            .post("https://reqres.in/api/users", formData)
            .then(function (response) {
                props.addUye(response.data);
                setFormData(emptyForm);
            })
            .catch(function (error) {
                console.log(error);
            }); 
    }

    function changeHandler(e) {
        let { value, type, checked } = e.target;

        if ( type === 'checkbox') {
            value = checked
        }

        const newFormData = {
            ...formData,
            [e.target.name]: value,
        };
        setFormData(newFormData);
    }

    return (
        <div>
            <h2>Yeni Üye Ekle</h2>
            <p style={{color: 'red'}}>{hataMesaji}</p>
            <form onSubmit={submitHandler}>
                <label htmlFor="name">İsim:</label>
                <input
                    onChange={(e) => changeHandler(e)}
                    type="text"
                    name="name"
                    value={formData.name}
                />

                <label htmlFor="email">E-posta:</label>
                <input
                    onChange={(e) => changeHandler(e)}
                    type="email"
                    name="email"
                    value={formData.email}
                />

                <label htmlFor="pass">Şifre:</label>
                <input
                    onChange={(e) => changeHandler(e)}
                    type="password"
                    name="pass"
                    value={formData.pass}
                />

                <label htmlFor="term">Onay</label>
                <input
                    onChange={(e) => changeHandler(e)}
                    type="checkbox"
                    name="term"
                    checked={formData.term}
                />

                <button type="submit">
                    Yeni Üye Ekle
                </button> 
            </form>
        </div>
    )
}

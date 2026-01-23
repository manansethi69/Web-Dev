import React, {useState} from 'react';
import axios from 'axios';

const CreateResume=()=>{

    const [role, setRole]= useState('developer');

    const [form, setDataInForm]= useState({
        name: '', email: '', phone_number: '', LinkedIn: '',
        course: '', university: '',
        job_title1: '', company_name1: '', company_role1: '',
        job_title2: '', company_name2: '', company_role2: '',
        award1: '', award2: '',
        tech_skill1: '', tech_skill2: '', tech_skill3: '',
        soft_skill1: '', soft_skill2: '', soft_skill3: '',
        subjects: '', years: ''

    })

    const changeRole=(e)=>{
        setRole(e.target.value);
    };

    const changeData=(e)=>{
        setDataInForm({...form, [e.target.name]: e.target.value});
    };

    const submitForm=(e)=>{
        e.preventDefault();
        axios.post('/api/resume/create', {role, ...form})
            .then(response=>{
                console.log('Resume submitted');
            })
            .catch(error=> {
                console.error('Error occurred', error);
            });
    };

    return(
        <div>
            <h1>Build Your Resume</h1>
            <form onSubmit={submitForm}>
                <div>
                    <label>Select your Role:</label>
                    <select value={{role}} onChange={changeRole}>
                        <option value="developer">Developer</option>
                        <option value="tutor">Tutor</option>
                    </select>
                </div>
                <div>
                    <label>Enter your Name: </label>
                    <input type="text" name="name" value={form.name} onChange={changeData} required/>
                </div>
                <div>
                    <label>Enter your Email: </label>
                    <input type="email" name="email" value={form.email} onChange={changeData} required/>
                </div>


            {role === 'developer' && (
                <>
                <div>
                    <label>Enter your Phone Number (optional): </label>
                    <input type="number" name="phone_number" value={form.phone_number} onChange={changeData}/>
                </div>
                <div>
                    <label>LinkedIn Link: </label>
                    <input type="url" name="LinkedIn" value={form.LinkedIn} onChange={changeData}/>
                </div>
                <div>
                    <label>Field of Study: </label>
                    <input type="text" name="course" value={form.course} onChange={changeData}/>
                </div>
                <div>
                    <label>Name of University: </label>
                    <input type="text" name="university" value={form.university} onChange={changeData}/>
                </div>
                <div>
                    <label>Job Role: </label>
                    <input type="text" name="job_title1" value={form.job_title1} onChange={changeData}/>
                </div>
                <div>
                    <label>Name of Company: </label>
                    <input type="text" name="company_name1" value={form.company_name1} onChange={changeData}/>
                </div>
                <div>
                    <label>Your Duties: </label>
                    <textarea name="company_role1" value={form.company_role1} onChange={changeData}/>
                </div>
                <div>
                    <label>Job Role: </label>
                    <input type="text" name="job_title2" value={form.job_title2} onChange={changeData}/>
                </div>
                <div>
                    <label>Name of Company: </label>
                    <input type="text" name="company_name2" value={form.company_name2} onChange={changeData}/>
                </div>
                <div>
                    <label>Your Duties: </label>
                    <textarea name="company_role2" value={form.company_role2} onChange={changeData}/>
                </div>
                <div>
                    <label>Award 1: </label>
                    <input type="text" name="award1" value={form.award1} onChange={changeData}/>
                </div>
                <div>
                    <label>Award 2: </label>
                    <input type="text" name="award2" value={form.award2} onChange={changeData}/>
                </div>
                <div>
                    <label>Tech Skill 1: </label>
                    <input type="text" name="tech_skill1" value={form.tech_skill1} onChange={changeData}/>
                </div>
                <div>
                    <label>Tech Skill 2: </label>
                    <input type="text" name="tech_skill2" value={form.tech_skill2} onChange={changeData}/>
                </div>
                <div>
                    <label>Tech Skill 3: </label>
                    <input type="text" name="tech_skill3" value={form.tech_skill3} onChange={changeData}/>
                </div>
                <div>
                    <label>Soft Skill 1: </label>
                    <input type="text" name="soft_skill1" value={form.soft_skill1} onChange={changeData}/>
                </div>
                <div>
                    <label>Soft Skill 2: </label>
                    <input type="text" name="soft_skill2" value={form.soft_skill2} onChange={changeData}/>
                </div>
                <div>
                    <label>Soft Skill 3: </label>
                    <input type="text" name="soft_skill3" value={form.soft_skill3} onChange={changeData}/>
                </div>
                </>
            )}
            {role === 'tutor' && (
                <>
                    <div>
                        <label>Enter your Phone Number (optional): </label>
                        <input type="number" name="phone_number" value={form.phone_number} onChange={changeData}/>
                    </div>
                    <div>
                        <label>LinkedIn Link: </label>
                        <input type="url" name="LinkedIn" value={form.LinkedIn} onChange={changeData}/>
                    </div>
                    <div>
                        <label>Field of Study: </label>
                        <input type="text" name="course" value={form.course} onChange={changeData}/>
                    </div>
                    <div>
                        <label>Name of University: </label>
                        <input type="text" name="university" value={form.university} onChange={changeData}/>
                    </div>
                    <div>
                        <label>Job Role: </label>
                        <input type="text" name="job_title1" value={form.job_title1} onChange={changeData}/>
                    </div>
                    <div>
                        <label>Name of Company: </label>
                        <input type="text" name="company_name1" value={form.company_name1} onChange={changeData}/>
                    </div>
                    <div>
                        <label>Your Duties: </label>
                        <textarea name="company_role1" value={form.company_role1} onChange={changeData}/>
                    </div>
                    <div>
                        <label>Job Role: </label>
                        <input type="text" name="job_title2" value={form.job_title2} onChange={changeData}/>
                    </div>
                    <div>
                        <label>Name of Company: </label>
                        <input type="text" name="company_name2" value={form.company_name2} onChange={changeData}/>
                    </div>
                    <div>
                        <label>Your Duties: </label>
                        <textarea name="company_role2" value={form.company_role2} onChange={changeData}/>
                    </div>
                    <div>
                        <label>Award 1: </label>
                        <input type="text" name="award1" value={form.award1} onChange={changeData}/>
                    </div>
                    <div>
                        <label>Award 2: </label>
                        <input type="text" name="award2" value={form.award2} onChange={changeData}/>
                    </div>
                    <div>
                        <label>Tech Skill 1: </label>
                        <input type="text" name="tech_skill1" value={form.tech_skill1} onChange={changeData}/>
                    </div>
                    <div>
                        <label>Tech Skill 2: </label>
                        <input type="text" name="tech_skill2" value={form.tech_skill2} onChange={changeData}/>
                    </div>
                    <div>
                        <label>Tech Skill 3: </label>
                        <input type="text" name="tech_skill3" value={form.tech_skill3} onChange={changeData}/>
                    </div>
                    <div>
                        <label>Soft Skill 1: </label>
                        <input type="text" name="soft_skill1" value={form.soft_skill1} onChange={changeData}/>
                    </div>
                    <div>
                        <label>Soft Skill 2: </label>
                        <input type="text" name="soft_skill2" value={form.soft_skill2} onChange={changeData}/>
                    </div>
                    <div>
                        <label>Soft Skill 3: </label>
                        <input type="text" name="soft_skill3" value={form.soft_skill3} onChange={changeData}/>
                    </div>
                    <div>
                        <label>Subjects Taught:</label>
                        <input type="text" name="subjects" value={form.subjects} onChange={changeData}
                               placeholder="Enter subjects taught (e.g., Mathematics, Physics)" required/>
                    </div>
                    <div>
                        <label>Years of Tutoring Experience:</label>
                        <input type="number" name="years" value={form.years} onChange={changeData} placeholder="Enter years of tutoring experience" min="0" required/>
                    </div>


                </>
            )}
                <button type="submit">Build Resume</button>

            </form>
        </div>
    );


};

export default CreateResume;
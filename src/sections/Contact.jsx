import React from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { media } from '../styles/Responsive';

const ContactContainer = styled.div`
	margin-bottom: 3rem;
`;

const ContactTitle = styled.h2`
	font-size: 2rem;
	margin-bottom: 1.5rem;
	color: var(--text-color);
	position: relative;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 1rem;
	svg {
		font-size: 1rem;
	}

	&::after {
		content: '';
		position: absolute;
		bottom: -10px;
		left: 0;
		width: 10rem;
		height: 0.1875rem;
		background: linear-gradient(
			90deg,
			var(--primary-color) 0%,
			var(--card-background, #6d9fff) 100%
		);
	}

	${media.mobile`
    font-size: 1.75rem;
  `}
`;

const ContactContent = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 2rem;

	${media.mobile`
    grid-template-columns: 1fr;
  `}
`;

const ContactInfo = styled.div`
	background-color: var(--card-background);
	border-radius: var(--border-radius);
	padding: 2rem;
	z-index: 1;
	box-shadow: var(--card-shadow);

	${media.mobile`
    padding: 1.5rem;
  `}
`;

const ContactText = styled.p`
	font-size: 1rem;
	line-height: 1.7;
	color: var(--text-secondary);
	margin-bottom: 2rem;
`;
const ContactInfoTitle = styled.h3`
	font-size: 1.5rem;
	margin-bottom: 1.5rem;
	color: var(--text-color);

	${media.mobile`
    font-size: 1.3rem;
  `}
`;

const ContactInfoItem = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1.5rem;
`;

const ContactInfoIcon = styled.div`
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 50%;
	background-color: var(--primary-color);
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 1rem;
	color: white;
	font-size: 1.2rem;

	${media.mobile`
    width: 2.1875rem;
    height: 2.1875rem;
    font-size: 1rem;
  `}
`;

const ContactInfoText = styled.div`
	color: var(--text-color);

	h4 {
		font-size: 1rem;
		margin-bottom: 0.25rem;
	}

	p {
		color: var(--text-secondary);
		margin-bottom: 0;
	}

	${media.mobile`
    h4 {
      font-size: .9rem;
    }
    
    p {
      font-size: .85rem;
    }
  `}
`;

const MapContainer = styled.div`
	margin-top: 2rem;
	height: 18.75rem;
	border-radius: 0.5rem;
	overflow: hidden;

	iframe {
		width: 100%;
		height: 100%;
		border: none;
	}

	${media.mobile`
		height: 15.625rem;
  `}
`;
const ContactForm = styled.div`
	background-color: var(--card-background);
	border-radius: var(--border-radius);
	padding: 2rem;
	z-index: 1;
	box-shadow: var(--card-shadow);

	${media.mobile`
    padding: 1.5rem;
  `}
`;

const ContactFormTitle = styled.h3`
	font-size: 1.5rem;
	margin-bottom: 1.5rem;
	color: var(--text-color);

	${media.mobile`
    font-size: 1.3rem;
  `}
`;

const FormGroup = styled.div`
	margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
	display: block;
	margin-bottom: 0.5rem;
	color: var(--text-color);
	font-weight: 500;

	${media.mobile`
    font-size: .9rem;
  `}
`;

const FormInput = styled(Field)`
	width: 100%;
	padding: 0.75rem 1rem;
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 0.5rem;
	background-color: var(--background-color);
	color: var(--text-color);
	font-family: inherit;

	&:focus {
		outline: none;
		border-color: var(--primary-color);
	}

	${media.mobile`
    padding: .6rem .8rem;
    font-size: .9rem;
  `}
`;

const FormTextarea = styled(Field)`
	width: 100%;
	padding: 0.75rem 1rem;
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 0.5rem;
	background-color: var(--background-color);
	color: var(--text-color);
	font-family: inherit;
	resize: vertical;
	min-height: 9.375rem;

	&:focus {
		outline: none;
		border-color: var(--primary-color);
	}

	${media.mobile`
    padding: .6rem .8rem;
    font-size: .9rem;
    min-height: 7.5rem;
  `}
`;

const ErrorText = styled.div`
	color: #ff5656;
	font-size: 0.875rem;
	margin-top: 0.5rem;

	${media.mobile`
    font-size: .8rem;
  `}
`;

const SubmitButton = styled.button`
	display: inline-block;
	padding: 0.75rem 2rem;
	background-color: var(--primary-color);
	color: white;
	border: none;
	border-radius: 3.125rem;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;

	&:hover {
		transform: translateY(-3px);
		box-shadow: 0 0.25rem 1rem rgba(138, 86, 255, 0.4);
	}

	&:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	${media.mobile`
    padding: .6rem 1.5rem;
    font-size: .9rem;
  `}
`;

const Contact = () => {
	const validationSchema = Yup.object({
		name: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Name is required'),
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is required'),
		subject: Yup.string().required('Subject is required'),
		message: Yup.string().required('Message is required'),
	});

	const handleSubmit = async (
		event,
		values,
		{ setSubmitting, resetForm }
	) => {
		console.log(values);

		setTimeout(() => {
			alert('Message sent successfully!');
			resetForm();
			// setSubmitting(false);
		}, 1000);

		event.preventDefault();
		const formData = new FormData(event.target);

		formData.append('access_key', 'YOUR_ACCESS_KEY_HERE');

		const object = Object.fromEntries(formData);
		const json = JSON.stringify(object);

		const res = await fetch('https://api.web3forms.com/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: json,
		}).then((res) => res.json());

		if (res.success) {
			console.log('Success', res);
		}
	};

	return (
		<ContactContainer id='contact'>
			<ContactTitle tabIndex='0'>
				Contact Me{' '}
				<FaEnvelope
					aria-label='Contact icon'
					title='Contact icon'
				/>
			</ContactTitle>
			<ContactContent>
				<ContactInfo>
					<ContactText>
						I'm always interested in hearing about new projects and
						opportunities. Whether you have a question about a
						project, want to discuss a potential collaboration, or
						just want to say hello, I'd love to hear from you.
					</ContactText>
					<ContactText>
						Fill out the form with some information about your
						project, and I'll get back to you as soon as possible.
						Looking forward to connecting with you!
					</ContactText>
					<ContactInfoTitle>Get In Touch</ContactInfoTitle>

					<ContactInfoItem>
						<ContactInfoIcon>
							<FaEnvelope />
						</ContactInfoIcon>
						<ContactInfoText>
							<h4>Email</h4>
							<p>lalithd1@umbc.edu</p>
						</ContactInfoText>
					</ContactInfoItem>

					<ContactInfoItem>
						<ContactInfoIcon>
							<FaPhone />
						</ContactInfoIcon>
						<ContactInfoText>
							<h4>Phone</h4>
							<p>+1 (667) 369-5895</p>
						</ContactInfoText>
					</ContactInfoItem>

					<ContactInfoItem>
						<ContactInfoIcon>
							<FaMapMarkerAlt />
						</ContactInfoIcon>
						<ContactInfoText>
							<h4>Location</h4>
							<p>Maryland, USA</p>
						</ContactInfoText>
					</ContactInfoItem>
					<MapContainer>
						<iframe
							allowFullScreen=''
							loading='lazy'
							title='Location Map'
							src='https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=University%20of%20Maryland,%20Baltimore%20County,%20Maryland,%20USA+(University%20of%20Maryland)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'></iframe>
					</MapContainer>
				</ContactInfo>

				<ContactForm>
					<ContactFormTitle>Send Message</ContactFormTitle>

					<Formik
						initialValues={{
							name: '',
							email: '',
							subject: '',
							message: '',
						}}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}>
						{({ isSubmitting }) => (
							<Form>
								<FormGroup>
									<FormLabel htmlFor='name'>Name</FormLabel>
									<FormInput
										type='text'
										id='name'
										name='name'
										aria-required='true'
										aria-label='name'
									/>
									<ErrorMessage
										name='name'
										component={ErrorText}
									/>
								</FormGroup>

								<FormGroup>
									<FormLabel htmlFor='email'>Email</FormLabel>
									<FormInput
										type='email'
										id='email'
										name='email'
										aria-required='true'
										aria-label='email'
									/>
									<ErrorMessage
										name='email'
										component={ErrorText}
									/>
								</FormGroup>

								<FormGroup>
									<FormLabel htmlFor='subject'>
										Subject
									</FormLabel>
									<FormInput
										type='text'
										id='subject'
										name='subject'
										aria-required='true'
										aria-label='subject'
									/>
									<ErrorMessage
										name='subject'
										component={ErrorText}
									/>
								</FormGroup>

								<FormGroup>
									<FormLabel htmlFor='message'>
										Message
									</FormLabel>
									<FormTextarea
										as='textarea'
										id='message'
										name='message'
										aria-required='true'
										aria-label='message'
									/>
									<ErrorMessage
										name='message'
										component={ErrorText}
									/>
								</FormGroup>

								<SubmitButton
									aria-label='submit'
									type='submit'
									title='Submit'
									disabled={isSubmitting}>
									{isSubmitting
										? 'Sending...'
										: 'Send Message'}
								</SubmitButton>
							</Form>
						)}
					</Formik>
				</ContactForm>
			</ContactContent>
		</ContactContainer>
	);
};

export default Contact;

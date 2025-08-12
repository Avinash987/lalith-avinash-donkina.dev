import React from 'react';
import Hero from '../../sections/Hero';
import About from '../../sections/About';
import Skills from '../../sections/Skills';
import Projects from '../../sections/Projects';
import Experience from '../../sections/Experience';
import Contact from '../../sections/Contact';

const HomePage = () => {
	return (
		<>
			<section id='home'>
				<Hero />
			</section>
			<section id='about'>
				<About />
			</section>
			<section id='projects'>
				<Projects />
			</section>
			<section id='skills'>
				<Skills />
			</section>
			<section id='experience'>
				<Experience />
			</section>
			<section id='contact'>
				<Contact />
			</section>
		</>
	);
};

export default HomePage;

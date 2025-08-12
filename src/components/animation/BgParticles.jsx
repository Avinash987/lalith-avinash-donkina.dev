import React, { useEffect, useState, useMemo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
// import { loadFull } from "tsparticles";
import { loadSlim } from '@tsparticles/slim';
import styled from 'styled-components';

const ParticlesContainer = styled.div`
	position: absolute;
	inset: 0;
	overflow: hidden;
	border-radius: inherit;
	z-index: -10;
	pointer-events: none;

	& canvas {
		position: absolute !important;
		width: 100% !important;
		height: 100% !important;
		top: 0 !important;
		left: 0 !important;
		right: 0 !important;
		bottom: 0 !important;
		object-fit: cover !important;
	}
`;

export default function BgParticles({ type, containerId }) {
	const [init, setInit] = useState(false);

	useEffect(() => {
		initParticlesEngine(async (engine) => {
			await loadSlim(engine);
		}).then(() => {
			setInit(true);
		});
	}, []);
	const presetOptions = useMemo(
		() => ({
			links: {
				fpsLimit: 60,

				interactivity: {
					events: {
						onClick: {
							enable: true,
							mode: 'push',
						},
						onHover: {
							enable: true,
							mode: 'repulse',
						},
					},
					modes: {
						push: {
							quantity: 4,
						},
						repulse: {
							distance: 200,
							duration: 0.4,
						},
					},
				},
				particles: {
					color: {
						value: '#000',
					},
					links: {
						color: '#000',
						distance: 150,
						enable: true,
						opacity: 0.5,
						width: 1,
					},
					move: {
						direction: 'none',
						enable: true,
						outModes: {
							default: 'bounce',
						},
						random: false,
						speed: 6,
						straight: false,
					},
					number: {
						density: {
							enable: true,
						},
						value: 80,
					},
					opacity: {
						value: 0.2,
					},
					shape: {
						type: 'star',
					},
					size: {
						value: { min: 1, max: 3 },
					},
				},
				detectRetina: true,
			},
			zigZag: {
				particles: {
					color: {
						value: ['#ffffff', '#ff0000', '#00ff00', '#0000ff'],
					},
					move: {
						enable: true,
						outModes: 'out',
						speed: { min: 1, max: 3 },
						path: {
							enable: true,
							options: {
								waveLength: { min: 3, max: 7 },
								waveHeight: { min: 1, max: 5 },
							},
							generator: 'zigZagPathGenerator',
						},
						trail: {
							enable: true,
							length: 20,
							fill: {
								color: 'transparent',
							},
						},
					},
					number: {
						value: 80,
					},
					opacity: {
						value: 1,
					},
					shape: {
						type: 'circle',
					},
					size: {
						value: 3,
					},
				},
			},
			seaAnemone: {
				particles: {
					color: {
						value: '#FF0000',
					},
					move: {
						enable: true,
						direction: 'none',
						outModes: {
							default: 'destroy',
						},
						path: {
							clamp: false,
							enable: true,
							delay: {
								value: 0,
							},
							generator: 'curvesPathGenerator',
						},
						speed: 1,
						trail: {
							enable: true,
							fill: { color: '#000' },
							length: 30,
						},
					},
					number: {
						density: {
							enable: true,
						},
						value: 0,
					},
					opacity: {
						value: 1,
					},
					shape: {
						type: 'circle',
					},
					size: {
						value: {
							min: 1,
							max: 10,
						},
						animation: {
							count: 1,
							startValue: 'min',
							enable: true,
							speed: 10,
							sync: true,
						},
					},
				},
				emitters: {
					direction: 'none',
					rate: {
						quantity: 5,
						delay: 0.3,
					},
					size: {
						width: 0,
						height: 0,
					},
					spawnColor: {
						value: '#ff0000',
						animation: {
							enable: true,
							speed: 10,
						},
					},
					position: {
						x: 50,
						y: 50,
					},
				},
			},
			hyperspace: {
				key: 'hyperspace',
				name: 'Hyperspace',
				background: {
					color: '#000',
				},
				particles: {
					color: {
						value: [
							'#3998D0',
							'#2EB6AF',
							'#A9BD33',
							'#FEC73B',
							'#F89930',
							'#F45623',
							'#D62E32',
							'#EB586E',
							'#9952CF',
						],
					},
					move: {
						enable: true,
						outModes: {
							default: 'destroy',
						},
						speed: 3,
						trail: {
							fill: { color: '#000' },
							length: 30,
							enable: true,
						},
					},
					number: {
						density: {
							enable: true,
						},
						value: 0,
					},
					opacity: {
						value: 1,
					},
					shape: {
						type: 'circle',
					},
					size: {
						value: {
							min: 1,
							max: 25,
						},
						animation: {
							startValue: 'min',
							enable: true,
							speed: 2,
							destroy: 'max',
							sync: true,
						},
					},
				},
				emitters: {
					direction: 'none',
					rate: {
						quantity: 5,
						delay: 0.3,
					},
					size: {
						width: 0,
						height: 0,
					},
					position: {
						x: 50,
						y: 50,
					},
				},
			},
			triangles: {
				fpsLimit: 60,
				particles: {
					number: {
						value: 80,
					},
					color: {
						animation: {
							enable: true,
							speed: 20,
							sync: true,
						},
					},
					shape: {
						type: 'circle',
					},
					opacity: {
						value: 0.5,
					},
					size: {
						value: { min: 1, max: 3 },
					},
					links: {
						enable: true,
						color: '#000000',
						distance: 40,
						opacity: 0.1,
						width: 1,
						triangles: {
							enable: true,
							color: '#000000',
							opacity: 0.1,
						},
					},
					move: {
						enable: true,
						speed: 2,
						direction: 'none',
						outModes: 'out',
					},
				},
				interactivity: {
					events: {
						onHover: {
							enable: true,
							mode: 'repulse',
						},
						onClick: {
							enable: true,
							mode: 'push',
						},
					},
					modes: {
						repulse: {
							distance: 200,
						},
						push: {
							quantity: 4,
						},
					},
				},
			},
		}),
		[]
	);

	const particlesLoaded = (container) => {
		// Make sure container DOM element stays confined
		if (container && container.canvas) {
			const canvas = container.canvas.element;
			if (canvas) {
				canvas.style.position = 'absolute';
				canvas.style.width = '100%';
				canvas.style.height = '100%';
			}
		}
	};

	const containedId = containerId || 'tsparticles';
	if (init) {
		return (
			<ParticlesContainer>
				<Particles
					id={containedId}
					particlesLoaded={particlesLoaded}
					options={{
						...(presetOptions?.[type] || presetOptions.links),
						fullScreen: {
							enable: false,
							zIndex: 0,
						},
					}}
				/>
			</ParticlesContainer>
		);
	}

	return <></>;
}

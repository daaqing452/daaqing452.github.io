var str_psychology = "\
	<h1> Psychology </h1> \
	<p> [<a href='https://www.coursera.org/learn/introduction-psychology/home/welcome'>Coursera</a>] [<a href='https://nobaproject.com/'>Noba</a>] </p> \
	<p> Update v0: 2021.01.27 </p> \
	<h2> Brain </h2> \
	<p> The brain uses oxygen (氧气) and glucose (葡萄糖), delivered by blood </p> \
	<h3> Brain Anatomy </h3> \
	<ul> \
		<li> Brain Stem (脑干) / Medulla (髓质): responsible for automatic functions that keeps alive, including breathing, heart rate, digestion, etc. </li> \
		<li> Cerebellum (小脑): coordinate movement and posture </li> \
		<li> Hypothalamus (下丘脑): responsible for hunger, thirst, sleep, body temperature, homeostasis, etc. </li> \
		<li> Cerebrum (大脑): responsible for cognitive abilities and conscious experience </li> \
	</ul> \
	<h4> Cerebral Hemisphere </h4> \
	<p> Cerebrum contains two cerebral hemispheres, connected by dense corpus callosum (胼胝体) </p> \
	<ul> \
		<li> <p> Cerebrum contains two cerebral hemispheres, connected by dense corpus callosum (胼胝体) </p> \
		<p> Topographical map: two things that are close together in the body are similarly close together in brain (e.g., elbow & finger); the size of brain areas doesn't correspond to the size of the actual body areas </p> </li> \
		<li> Four lobes (脑叶): occipital, temporal, parietal, frontal, responsible for different functions </li> \
	</ul> \
	<h4> Lateralization </h4> \
	<ul style='list-style-type:circle'> \
		<li> <p> Most functions are replicated (sensory, motor) </p> \
		<p> Contralateral (opposite-side) control: the left (right) cerebral hemisphere is responsible for sensations and movements on the right (left) of the body </p> </li> \
		<li> Left brain is more associated with written & spoken language, number & reasoning & logic skills </li> \
		<li> Right brain is more associated with insight, imagination, art & music awareness, 3D forms </li> \
	</ul> \
	<img height='200px' src='note_files/psychology/brain_0.png'/> &emsp;&emsp; \
	<img height='200px' src='note_files/psychology/brain_1.png'/> \
	<h3> Neuron </h3> \
	<p> Average human brain contains 100 billion neurons; each neuron connects to 1-10 thousands of neurons </p> \
	<ul> \
		<li> Dendrite (树突): receive signals from other neurons (excitatory=plus, inhibitory=minus </li> \
		<li> Cell body: sum up the pluses and minuses; if reach threshold, the neuron fires </li> \
		<li> Axon (轴突): firing transmit through, connect to dendrites of other neurons </li> \
		<li> Myelin sheath (髓鞘): fatty tissue insulation </li> \
		<li> Synapse (突触): gap between the axon and the dendrite of two neurons </li> \
		<li> Neurotransmitter: chemicals fired from one to the other between the synapse </li> \
	</ul> \
	<ul style='list-style-type: circle'>\
		<li> Sensory neuron: take information from the environment </li> \
		<li> Motor neuron: go from the brain out to motor control </li> \
		<li> Interneuron: connect different neurons </li> \
	</ul> \
	<p> A neuron fires all of nothing (0 or 1); code intensity by #neurons, impulse frequency </p> \
	<p> #neurotransmitters can be affected by antagonists (抑制剂) or agonists (兴奋剂) </p> \
	<h3> Neuroimaging </h3> \
	<p> Tools to study the brain (e.g., scanning) </p> \
	<ul> \
		<li> Positron Emission Tomography (PET, 正电子放射断层造影术): detects the radioactive substance that is injected into the bloodstream </li> \
		<li> Functional Magnetic Resonance Imaging (fMRI, 功能性磁共振成像): measure oxygen levels in the blood </li> \
		<li> Electroencephalograph (EEG, 脑电): measure the electrical activity </li> \
		<li> Diffuse Optical Imaging (DOI, 漫反射光学成像): shine infrared light into the brain and measure the light that comes back out </li> \
	</ul> \
	<h3> Somatosensory/Motor Homunculus (感观/运动侏儒) </h3> \
	<p> The distribution on the cortex corresponding to different parts of the body </p> \
	<p> The ratio (sensitivity) on the cortex corresponding to different parts of the body </p> \
	<img width='600px' src='note_files/psychology/brain_2.png'/> &emsp;&emsp; \
	<img width='300px' src='note_files/psychology/brain_3.png'/> \
	<h2> Freud's Theory </h2> \
	<p> Unconscious Motivation: unconscious reason for feelings and actions </p> \
	<p> Unconscious Dynamics: conflict between different systems in the brain </p> \
	<h3> Psychoanalytic (精神分析) Divisions of the Mind </h3> \
	<ul> \
		<li> <b>Id</b> (本我): present at birth, instinctual, animalistic, does not distinguish fantasy from reality, operates according to the pleasure principle (e.g., eat, drink, poop, pee, get warm, get sexual pleasure) </li> \
		<li> <b>Ego</b> (自我): develop out of the id in infancy, understand reality and logic, mediator between id and superego, i.e., conscious (e.g., pragmatically satisfy or repress desires) itself </li> \
		<li> <b>Superego</b> (超我): internalization of society's moral standards, responsible for guilt (e.g., not to cheat) </li> \
	</ul> \
	<h3> Psychosexual (性心理) Stages of Personality Development </h3> \
	<p> Associated with erogenous zones (性敏感带) </p> \
	<p> Fixation: one gets into a problem at a certain stage and doesn't resolve the problem, he will be stuck there and stay there as an adult (as an adult, one will achieve pleasure in ways equivalent in that stage) </p> \
	<ul> \
		<li> <p> Oral stage (口唇期) [birth - 1 year]: the mouth is associated with pleasure </p> \
		<p> Weaning a child incorrectly can lead to fixation </p> \
		<p> An adult will eat too much, chew gum, smoke, or be pessimistic, dependent, needy </p> </li> \
		<li> <p> Anal stage (肛门期) [1 – 3 years]: the anus is associated with pleasure </p> \
		<p> Incorrect toilet training can lead to fixation </p> \
		<p> An adult will be compulsive, stubborn, clean, stingy, unwilling to part with his own feces </p> </li> \
		<li> <p> Phallic stage (生殖器期) [3 - 5 years]: the focus of pleasure shifts to the genitals (生殖器) </p> \
		<p> A boy (girl) looks for sexual object to have contact with, the candidate will be mother (father), and he (she) wants to compete with / kill his father (her mother) </p> \
		<p> An adult will have excessive masculinity (大男子主义), Oedipus complex (恋母情结), a need for attention, or domination in females </p> </li> \
		<li> <p> Latency stage (潜伏期) [5 years – puberty (青春期)]: sexuality is repressed </p> \
		<p> Children participate in hobbies, school, friendship; boys and girls do activities separately </p> </li> \
		<li> <p> Genital stage (生殖期) [puberty on]: sexual feelings re-emerge and are oriented toward others </p> \
		<p> Healthy adults find pleasure in love and work </p> \
		<p> Fixated adults have their energy tied up in earlier stages, struggle with problems; if they are lucky, resolve and develop </p> </li> \
	</ul> \
	<h3> Defense Mechanism </h3> \
	<p> Ways to repress desires from id </p> \
	<ul> \
		<li> Displacement: redirect energy and focus to more appropriate targets </li> \
		<li> Sublimation: displacement to activities that are valued by society (e.g., hard-working) </li> \
		<li> Projection: reduce anxiety by attributing unacceptable impulse to someone else </li> \
		<li> Rationalization: reason away anxiety-producing thoughts </li> \
		<li> Regression: retreat to a mode of behavior characteristic of an earlier stage of development </li> \
		<li> Reaction formation: replace threatening wishes and fantasies with their opposites </li> \
	</ul> \
	<h4> Hysteria (歇斯底里) </h4> \
	<p> Failed to repress the impulses from id; cause blindness, deafness, paralysis, trembling, panic attacks, gaps of memory, etc. </p> \
	<p> These symptoms are a way of keep emotional charged memories and impulses under lock and key </p> \
	<p> When hysteria recovers, there is catharsis (宣泄), an explosive release of insight </p> \
	<h4> Treatment </h4> \
	<ul> \
		<li> Hypnosis (催眠术) </li> \
		<li> Free association (自由联想): give patient a word and he says something back in fast speed; get insights, without ego and superego filtering </li> \
		<li> Dream interpretation (解梦): distinguish latent (隐性) dream from manifest (显性) dream </li> \
		<li> Transference (移情): transfer positive or negative emotion to the doctor, reproduce the past emotion </li> \
	</ul> \
	<h2> Skinner's Theory: Behaviorism (行为主义) </h2> \
	<ul> \
		<li> Emphasis on learning: strong rejection of innate ideas or traits </li> \
		<li> Anti-Mentalism (反唯心主义): support real science, away from unscientific things (e.g., Freud) </li> \
		<li> No difference across species </li> \
	</ul> \
	<p> Three learning mechanisms: habituation, classical conditioning, operant conditioning </p> \
	<h3> Habituation (习惯化) </h3> \
	<p> A decline tendency to respond to stimuli that are familiar due to repeated exposure (e.g., get used to noise) </p> \
	<p> Useful psychological mechanism that keeps human focus on novelty, capture attention on new things (e.g., alert animals by strange environment changes) </p> \
	<h3> Classical Conditioning (经典条件反射) </h3> \
	<p> Pavlov reaction (巴甫洛夫效应) </p> \
	<p> The learning of an association between one stimulus and another stimulus (e.g., a dog produces saliva at the sound of a bell); passive </p> \
	<p> The adaptive mechanism that gives human sensitivity to cues that an event is about to happen, and the purpose of sensitivity allows human to prepare for that event </p> \
	<table cellpadding='5px'> \
		<tr style='border-top:1px solid #000000'> \
			<td class='table_padding20'> Before Learning </td> \
			<td style='text-align:right'> Neutral Stimulus A <br/> Unconditioned Stimulus B </td> \
			<td> → <br/> → </td> \
			<td> No Consistent Response <br/> Unconditioned Response </td> \
		</tr> <tr style='border-top:1px solid #000000'> \
			<td> During Learning </td> \
			<td style='text-align:right'> Neutral Stimulus A + Unconditioned Stimulus B </td> \
			<td> → </td> \
			<td> Unconditioned Response </td> \
		</tr> <tr style='border-top:1px solid #000000;border-bottom:1px solid #000000'> \
			<td> After Learning </td> \
			<td style='text-align:right'> Conditioned Stimulus A </td> \
			<td> → </td> \
			<td> Conditioned Response </td> \
		</tr> \
	</table> \
	<ul> \
		<li> <p> Reinforced trials: conditioned stimulus & unconditioned stimulus come together; increase the connection </p> \
		<p> Unreinforced trials: conditioned stimulus comes without unconditioned stimulus; decrease the connection </p> </li> \
		<li> Human learns the connection best when conditioned stimulus comes immediately before unconditioned stimulus </li> \
		<li> Systematic desensitization (系统性脱敏) - treatment of phobias (恐惧症): break up the connection between scary stimulus (e.g., snake) and fear by relaxing or taking drugs; so that stimulus comes to evoke the same response of relaxation or drugs </li> \
	</ul> \
	<h3> Operant (Instrumental) Conditioning (操作性条件反射) </h3> \
	<p> Learning the relationship between actions and rewards or punishment; active </p> \
	<ul> \
		<li> <p> Positive reinforcement: reward </p> \
		<p> Negative reinforcement: release from something aversive </p> \
		<p> Positive punishment </p> </li> \
		<li> <p> Law of Effect (Edward Thorndike's theory): an animal does different activities, gradually comes to the correct behavior in certain situation </p> \
		<p> The tendency to perform an action is increased if rewarded, weakened if not </p> </li> \
		<li> <p> Shaping: not wait for an action and reward it, but reward a roughly approximate action to lead the direction </p> \
		<p> Reward step by step </p> </li> \
		<li> Classical conditioning + operant conditioning (e.g., give a dog food & pat its head, later patting its head can be a reward) </li> \
		<li style='color:#ff0000'> <p> If you reward someone every time, when stop, the behavior will go away quickly </p> \
		<p> To make a behavior last long, reinforce partially & intermittently (fixed/variable ratio/interval schedule) </p> </li> \
	</ul> \
	<h2> Piaget's Theory: Development Psychology </h2> \
	<p> Big questions: </p> \
	<ul> \
		<li> Morality: children start with good or bad morality? </li> \
		<li> Continuity: the difference between children and adults? </li> \
		<li> <p> Knowledge: how much we are born with / we have to learn? </p> \
		<ul> \
			<li> Empiricism (经验主义): start from empty and learn </li> \
			<li> Nativism (天赋主义): born with rich powerful structure system </li> \
			<li> Constructivism (构成主义): share with empiricism and nativism </li> \
		</ul> \
		</li> \
	</ul> \
	<h3> Schemas (Frameworks for acquiring knowledge) </h3> \
	<p> Children think in entirely different ways that adults, transform during development </p> \
	<ul> \
		<li> Assimilation (同化): take in new information/experience and match it up with already existing schema </li> \
		<li> Accommodation (顺应): schemas are changed or created in order to fit new information </li> \
	</ul> \
	<h3> Developmental Stage Theory </h3> \
	<p> Children develop in four stages </p> \
	<ul> \
		<li> Sensorimotor stage (感觉动作期) [0-2 years]: information is gained through the senses and motor actions; the child perceives and manipulates but does not reason </li> \
		<li> Preoperational stage (前运算思维期) [2-7 years]: emergence of symbolic thought (e.g., object permanence); can reason but not in a higher order way (egocentric); lack the concept of conservation </li> \
		<li> Concrete Operational stage (具体运算思维期) [7-12 years]: increase logical thoughts (understanding conservation); less egocentric; inability to reason fully abstractly or hypothetically </li> \
		<li> Formal Operational stage (形式运算思维期) [12 years - adult]: abstract and scientific reasoning </li> \
	</ul> \
	<p> Current research shows that children generally acquire many of the abilities earlier </p> \
	<h4> Object Permanence (客体永久性) </h4> \
	<p> Understanding objects exist independently of one's actions or perceptions (e.g., ball rolls behind a curtain, but it will continue to exist) </p> \
	<h4> Egocentrism (自我中心主义) </h4> \
	<p> Children can't understand the world through another's perspectives </p> \
	<h4> Conservation (保持性) </h4> \
	<p> Certain operations on the world will change some properties but not others (e.g., spreading up candies sparsely doesn't change the number of candies) </p> \
	<h3> Methods for Studying Infants </h3> \
	<ul> \
		<li> <p> Observe the behavior that baby sucks a pacifier </p> \
		<p> Compare two sucking behaviors (enjoy or not enjoy) under two conditions </p> </li> \
		<li> <p> Study the minds of babies by their looking </p> \
		<p> Babies show surprise with something violates their expectation (longer stare time) </p> \
		<p> Babies get bored quickly with something that is the same as their expectation (look away) </p> </li> \
		<li> Show two things and let the baby choose </li> \
	</ul> \
	<h3> False Belief Task (错误信念任务) </h3> \
	<p> Infer someone have knowledge of the word that is false  </p> \
	<ul> \
		<li> Children have limitations to realize that other people could have false beliefs about the world </li> \
		<li> People with autism may also have egocentrism </li> \
	</ul> \
	<h4> Sally & Anne Test </h4> \
	<p> Sally has a basket, and Anne has box. Sally puts a marble into the basket and leaves. Anne takes the marble out of the basket and puts it into the box. Sally returns. </p> \
	<p> Question: where will Sally look for her marble? </p> \
	<p> -&emsp; Adults: basket, that's where she put the marble </p> \
	<p> -&emsp; Children: box, that's where the marble is </p> \
	<h3> Explanation for Development </h3> \
	<ul> \
		<li> <p> Brain is not fully developed </p> \
		<p> Neuron interconnections are large early, then prune when developing </p> \
		<p> Modernization: the myelin sheath around neurons that makes them run faster and more effectively </p> </li> \
		<li> <p> Brain contains specific modules (with their own developmental trajectory) </p> \
		<p> Different modules (e.g., for the physical world, for the social world, for the reasoning) have different innate knowledge, and their development is constrained in special way </p> </li> \
	</ul> \
	<h2> Language </h2> \
	<p> Language here works for <b>Listening</b> & <b>Speaking</b>; but <b>Reading</b> & <b>Writing</b> are not universal (more difficult) </p> \
	<h3> Creolization (克里奥尔混杂化) </h3> \
	<p> People with different native language create a new language to communicate </p> \
	<p> The first generation makes a makeshift jargon (临时术语): Pidgin (皮钦语), no word, no grammar </p> \
	<p> The second generation (children) born in these societies take this non-linguistic system as rudimentary system and transform it into a real language: Creole (克里奥尔语), with grammar (phonology, morphology and syntax, from low level to high level) </p> \
	<h3> Phonology (音韵学) </h3> \
		<p> Phonemes (音素): the basic building blocks of language </p> \
	<p> Different languages select a part from the universal body of phonemes </p> \
	<p> Also for sign languages (phonemes = primitive movements) </p> \
	<p> To segment a stream of phonemes into words, need to learn the rules and principles of a language </p> \
	<h3> Morphology (形态学) </h3> \
	<p> Morphemes (语素): the smallest meaningful unit; combine morphemes to make words </p> \
	<p> The arbitrariness of the sign: the sound of any word can mean anything </p> \
	<h3> Syntax (句法) </h3> \
	<p> Combine words into meaningful sentences using rules </p> \
	<p> Use recursion (e.g., a sentence can be part of the other sentence) to generate infinite sentences </p> \
	<p> Ambiguity: may lead to humor </p> \
	<h3> Language Acquisition Stage </h3> \
	<p> Children learn language by absorbing the language around them regardless reinforcement or punishment </p> \
	<ul> \
		<li> [Birth - 4 months]: preference to melody of own language; sensitive to all phonemes </li> \
		<li> [7 months]: babbling </li> \
		<li> [12 months]: first word – objects/actions/properties; some sensitivity to word order </li> \
		<li> [18 months]: learning words faster; multi-word sentences; functional phonemes (e.g., in, of, a, the) </li> \
		<li> <p> [Past puberty]: learning is more difficult </p> \
		<p> Past age 3, the older you start learning language, the worse you are </p> \
		<img width='400px' src='note_files/psychology/language_acquisition_stage.png'/> </li> \
	</ul> \
	<h3> Open Topics </h3> \
	<ul> \
		<li> Other species needs their own evolve communication system working differently with language </li> \
		<li> Language you learn changes the way you think </li> \
		<li> <p> Language may be essential for some unique human powers, but not for all abstract thoughts </p> \
		<p> Evidence: </p> \
		<p> -&emsp;  Even some nonverbal children can pass False Belief Task </p> \
		<p> -&emsp; Animals can understand 1+1=2 </p> </li> \
	</ul> \
";
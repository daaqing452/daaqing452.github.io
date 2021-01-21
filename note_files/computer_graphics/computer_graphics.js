var str_computer_graphics = "\
	<h1> Computer Graphics </h1> \
	<h2> Transformation </h2> \
	<h3> Homogeneous Coordinate </h3> \
	<p>3D Point: \\( (x,y,z,1)^\\top \\) </p> \
	<p>3D Vector: \\( (x,y,z,0)^\\top \\) </p> \
	<p> Vector \\( \\pm \\) Vector \\( = \\) Vector </p> \
	<p> Point \\( \\pm \\) Vector \\( = \\) Point </p> \
	<p> Point \\( - \\) Point \\( = \\) Vector </p> \
	<p> Point \\( + \\) Point \\( = \\) ? &emsp;&emsp; \\( (x,y,z,w)^\\top = (x/w,y/w,z/w,1)^\\top \\) </p> \
	<h3> Basic Linear Transformation </h3> \
	<table class='mdtable'> \
		<tr> \
			<td class='tpadding20'> Translation: </td> \
			<td> \\( {\\bf T} (t_x,t_y,t_z) = \\begin{bmatrix} \
				1 &   &   & t_x \\\\ \
				  & 1 &   & t_y \\\\ \
	 			  &   & 1 & t_z \\\\ \
	 			  &   &   &  1       \
			\\end{bmatrix} \\) </td> \
			<td></td> \
		</tr> <tr> \
			<td> Rotation: </td> \
			<td class='tpadding20'> \\( {\\bf R}_x(\\theta) = \\begin{bmatrix} \
				1 &                &                 & \\\\ \
				  & \\cos{\\theta} & -\\sin{\\theta} & \\\\ \
				  & \\sin{\\theta} &  \\cos{\\theta} & \\\\ \
				  &                &                 & 1    \
			\\end{bmatrix} \\) </td> \
			<td> \\( {\\bf R}(-\\theta) = {\\bf R}(\\theta)^{-1} = {\\bf R}(\\theta)^\\top \\) </td> \
		</tr> <tr> \
			<td> Scaling: </td> \
			<td> \\( {\\bf S}(s_x,s_y,s_z) = \\begin{bmatrix} \
				s_x &     &     &   \\\\ \
				    & s_y &     &   \\\\ \
				    &     & s_z &   \\\\ \
				    &     &     & 1      \
			\\end{bmatrix} \\) </td> \
			<td></td> \
		</tr> <tr> \
			<td> Shear: </td> \
			<td> \\( \\begin{bmatrix} \
				1 & a &   &   \\\\ \
				  & 1 &   &   \\\\ \
				  &   & 1 &   \\\\ \
				  &   &   & 1      \
			\\end{bmatrix} \\) </td> \
			<td></td> \
		</tr> \
	</table> \
	<h3> Affine Transformation </h3> \
	\\( \\begin{bmatrix} \
		a & b & c & t_x \\\\ \
		d & e & f & t_y \\\\ \
		g & h & i & t_z \\\\ \
		  &   &   & 1        \
	\\end{bmatrix} \\) \
	<h3> Euler Angle </h3> \
	<p> Order: Z (Roll) → X (Pitch) → Y (Yaw) </p> \
	<p> Gimbal Lock: mapping of Euler angles to rotations is \\( n \\) to \\( 1 \\) </p> \
	<p> Quaternion: \\( (x,y,z,w) \\) used for linear interpolation </p> \
	<h4> Rodrigues' Rotation Formula </h4> \
	<p> Rotation by angle \\( \\alpha \\) around axis \\( {\\bf n} \\) </p> \
	\\( {\\bf R}({\\bf n},\\alpha) = \\cos(\\alpha){\\bf I} + (1-\\cos(\\alpha)){\\bf nn}^\\top + \\sin{\\alpha} \\begin{bmatrix} \
		     & -n_z &  n_y \\\\ \
		 n_z &      & -n_x \\\\ \
		-n_y &  n_x &           \
	\\end{bmatrix} \\) \
	<h3> Viewing Transformation </h3> \
	<p> Transform camera to its original transformation, and the world moves correspondingly to keeps the same relative transformation </p> \
	<table> \
		<tr> \
			<td class='tpadding20'> Position: </td> \
			<td class='tpadding20'> \\( {\\bf t}=(t_x,t_y,t_z) \\) </td> \
			<td class='tpadding20'> → </td> \
			<td> \\( (0,0,0) \\) </td> \
		</tr> <tr> \
			<td> Forward: </td> \
			<td> \\( {\\bf f}=(f_x,f_y,f_z) \\) </td> \
			<td> → </td> \
			<td> -Z Axis </td> \
		</td> <tr> \
			<td> Upward: </td> \
			<td> \\( {\\bf u}={u_x,u_y,u_z} \\) </td> \
			<td> → </td> \
			<td> Y Axis </td> \
		</tr> \
	</table> \
	<ul> \
		<li> <p> Translate camera to origin: </p> \
		\\( {\\bf T}_{\\rm view} = \\begin{bmatrix} \
			1 &   &   & -t_x \\\\ \
			  & 1 &   & -t_y \\\\ \
			  &   & 1 & -t_z \\\\ \
			  &   &   & 1         \
		\\end{bmatrix} \\) </li> \
		<li> <p> Get inversed matrix of rotation </p> \
		\\( {\\bf R}_{\\rm view}^{-1} = \\begin{bmatrix} \
			({\\bf f} \\times {\\bf u})_x & u_x & -f_x &   \\\\ \
			({\\bf f} \\times {\\bf u})_y & u_y & -f_y &   \\\\ \
			({\\bf f} \\times {\\bf u})_z & u_z & -f_z &   \\\\ \
										  &     &      & 1      \
		\\end{bmatrix} \\) </li> \
		<li> <p> Get viewing transformation matrix </p> \
		\\( {\\bf M}_{\\rm view} = {\\bf R}_{\\rm view}{\\bf T}_{\\rm view} = ({\\bf R}_{\\rm view}^{-1})^\\top{\\bf T}_{\\rm view} \\) </li> \
	</ul> \
	<h3> Orthographic Projection </h3> \
	<p> Camera goes to origin, drop Z coordinate, translate and scale image to \\( [-1,1]^2 \\) </p> \
	<img width='150px' src='note_files/computer_graphics/orthographic_projection.png'/> \
	<p> Generally, map the cuboid \\( [l,r]\\times[b,t]\\times[f,n] \\) to a canonical cube \\( [-1,1]^3 \\) </p> \
	\\( {\\bf M}_{\\rm ortho} = {\\bf S}_{\\rm ortho}{\\bf T}_{\\rm ortho} = \\begin{bmatrix} \
		\\frac{2}{r-l} &                &                &   \\\\ \
		               & \\frac{2}{t-b} &                &   \\\\ \
		               &                & \\frac{2}{n-f} &   \\\\ \
		               &                &                & 1      \
	\\end{bmatrix} \\begin{bmatrix} \
		1 &   &   & -\\frac{r+l}{2} \\\\ \
		  & 1 &   & -\\frac{t+b}{2} \\\\ \
		  &   & 1 & -\\frac{n+f}{2} \\\\ \
		  &   &   & 1                    \
	\\end{bmatrix} \\) \
	<p> <a href=''> Field-of-View (FOV) </a>: sometimes prefer vertical FOV (fovY) </p> \
	<p> <b> Aspect ratio </b> = width / height </p> \
	<h3> Perspective Projection </h3> \
	<p>Transform the frustum (perspective projection) to the cuboid (orthographic projection) </p> \
	<img width='400px' src='note_files/computer_graphics/perspective_projection.png'/> \
	<p> \\( {\\bf M}_{\\rm persp} = {\\bf M}_{\\rm ortho}{\\bf M}_{\\rm persp\\rightarrow ortho} \\) </p> \
	<p> \\( {\\bf M}_{\\rm persp} \\begin{bmatrix} \
		x \\\\ y \\\\ z \\\\ 1 \
	\\end{bmatrix} = \\begin{bmatrix} \
		nx/z \\\\ ny/z \\\\ {\\rm unknown} \\\\ 1 \
	\\end{bmatrix} = \\begin{bmatrix} \
		nx \\\\ ny \\\\ {\\rm unknown} \\\\ z \
	\\end{bmatrix} \\) </p> \
	<p> By consider immobile points \\( (0,0,n) \\) and \\( (0,0,f) \\), get unknown coefficients </p> \
	<p> \\( {\\bf M}_{\\rm persp\\rightarrow ortho} = \\begin{bmatrix} \
		n &   &     &     \\\\ \
		  & n &     &     \\\\ \
		  &   & n+f & -nf \\\\ \
		  &   & 1   &          \
	\\end{bmatrix} \\) </p> \
	<h2> Rasterization </h2> \
	<p> Break up polygons into triangles, and draw projected triangles on screen and set pixel values </p> \
	<h3> <span class='badge badge-secondary' style='font-weight:normal'>[Basic]</span> Convolution Theorem </h3> \
	<p> Convolution in spatial domain = Multiplication in frequency domain </p> \
	<p> Convolution in frequency domain = Multiplication in spatial domain </p> \
	<h3> <span class='badge badge-secondary' style='font-weight:normal'>[Basic]</span> Sampling </h3> \
	<p> Sampling = repeat frequency contents </p> \
	<img width='500px' src='note_files/computer_graphics/sampling_0.png'/> \
	<p> Aliasing = mixed frequency contents </p> \
	<img width='500px' src='note_files/computer_graphics/sampling_1.png'/> \
	<h3> Anti-Aliasing </h3> \
	<ul> \
		<li> Increase sampling rate </li> \
		<li> Blurring or Pre-Filtering (filtering our high frequencies) before sampling </li> \
	</ul> \
	<img width='400px' src='note_files/computer_graphics/anti-aliasing.png'/> \
	<h3> Super-Sampling (MSAA) </h3> \
	<p> Sampling multiple location within a pixel and averaging their values </p> \
	<img width='400px' src='note_files/computer_graphics/super-sampling.png'/> \
	<p> Other milestones: </p> \
	<ul> \
		<li> FXAA (Fast Approximate AA) </li> \
		<li> TAA (Temporal AA) </li> \
		<li> DLSS (Deep Learning Super-Sampling) </li> \
	</ul> \
	<h3> Z-Buffer </h3> \
	<p> Store current minimum Z-value for each sample (pixel) </p> \
	<ol> \
		<li> Frame buffer stores color values </li> \
		<li> Depth buffer (Z-buffer) stores depth </li> \
	</ol> \
	<h3> Shadow Mapping </h3> \
	<p> Two passes: </p> \
	<ol> \
		<li> Pass 1: get depth image from light source (shadow map, Z-buffer of light source) </li> \
		<li> Pass 2A: standard image (with depth) from eye </li> \
		<li> Pass 2B: project visible points in eye view back to light source </li> \
		<li> Compare distance from light source of each point with the depth of corresponding pixel in shadow map: if not match, the point is in shadow </li> \
	</ol> \
	<img width='150px' src='note_files/computer_graphics/shadow_mapping.png'/> \
	<p> Problems: </p> \
	<ul> \
		<li> Hard shadows (point light only) </li> \
		<li> Quality depends on shadow map resolution </li> \
		<li> Involves equality comparison of floating-point depth values means issues of scale, bias, tolerance </li> \
	</ul> \
	<h2> Shading </h2> \
	<h3> Graphics (Real-time Rendering) Pipeline </h3> \
	<img width='500px' src='note_files/computer_graphics/graphics_pipeline.png'/> \
	<h3> Blinn-Phong Reflectance Model </h3> \
	<img width='200px' src='note_files/computer_graphics/blinn-phong.png'/> \
	<p> \\( \\begin{align} L_{\\rm diffuse} & = k_{\\rm diffuse}\\frac{I}{r^2}\\max(0,{\\bf n}\\cdot{\\bf l}) \\\\ \
	L_{\\rm specular} & = k_{\\rm specular}\\frac{I}{r^2}\\max(0,{\\bf n}\\cdot{\\bf h})^p \\\\ \
	L_{\\rm ambient} & = k_{\\rm ambient}I_{\\rm ambient} \\\\ \
	L & = L_{\\rm diffuse} + L_{\\rm specular} + L_{\\rm ambient} \\end{align} \\) </p> \
	<p> where \\( L \\) is the reflected light; \\( \\frac{I}{r^2} \\) is the energy arrived at the shading point (intensity / (distance from the light source)<sup>2</sup>); \\( k,p \\) are coefficients; \\( {\\bf h} = \\frac{{\\bf v}+{\\bf l}}{||{\\bf v}+{\\bf l}||} \\) is the bisector of \\( {\\bf v} \\) and \\( {\\bf l} \\) </p> \
	<h3> Shading Models </h3> \
	<table> \
		<tr> \
			<td> <b>Flat</b> shading: </td> \
			<td> shade each triangle </td> \
		</tr> <tr> \
			<td class='tpadding20'> <b>Gouraud</b> shading: </td> \
			<td> shade each vertex </td> \
		</tr> <tr> \
			<td> <b>Phong</b> shading: </td> \
			<td> shade each fragment (e.g., pixel) </td> \
		</tr> \
	</table> \
	<h3> Interpolation of Vertex Normal Vector </h3> \
	<p> Average surrounding faces' normal vectors </p> \
	<p> $$ {\\bf N}_v = \\frac{\\sum_i{{\\bf N}_i}}{||\\sum_i{{\\bf N}_i}||} \\hspace{100cm} $$ </p> \
	<img width='200px' src='note_files/computer_graphics/interpolation_of_normal.png'/> \
	<h3> Barycentric Coordinate </h3> \
	<p> A coordinate system \\( (\\alpha,\\beta,\\gamma) \\) for triangles </p> \
	<img width='200px' src='note_files/computer_graphics/barycentric_coordinate.png'/> \
	<p> \\( P=\\alpha A + \\beta B + \\gamma C \\) </p> \
	<p> \\( \\alpha+\\beta+\\gamma=1, \\alpha\\ge 0, \\beta\\ge 0, \\gamma\\ge 0 \\) </p> \
	<p> Only work triangles in 3D space, not equals to work for 3D triangles in a 2D raster screen </p> \
	<p> \\( \\begin{align} \
		\\alpha &=\\frac{A_A}{A_A+A_B+A_C}=\\frac{(P-B)\\times(C-B)}{(A-B)\\times(C-B)} \\\\ \
		\\beta &=\\frac{A_B}{A_A+A_B+A_C}=\\frac{(P-C)\\times(A-C)}{(B-C)\\times(A-C)} \\\\ \
		\\gamma &=\\frac{A_C}{A_A+A_B+A_C}=1-\\alpha-\\beta \
	\\end{align} \\) </p> \
	<h2> Texture </h2> \
	<p> Get texture coordinate \\( (u,v) \\) of a point, and sample \\( (u,v) \\) on the texture </p> \
	<h3> Texture Magnification Problems </h3> \
	<p> <b>Texel</b>: a pixel on a texture </p> \
	<ul> \
		<li> Jaggies (Oversampling): Texture is too small <ul> \
			<li> Bilinear Interpolation </li> \
			<li> Bicubic Interpolation </li> </ul> \
		</li> \
		<li> Moiré Pattern (Undersampling): A pixel covers a range of texels <ul> \
			<li> Mipmap </li> \
			<li> Anisotropic Filtering </li> </ul> \
		</li> \
	</ul> \
	<h3> Bilinear Interpolation </h3> \
	<img width='150px' src='note_files/computer_graphics/bilinear_interpolation.png'/> \
	<p> \\( {\\rm Lerp}(x,v_0,v_1)=v_0+x(v_1-v_0) \\) </p> \
	<p> \\( f(x,y)={\\rm Lerp}(s,{\\rm Lerp}(t,u_{00},u_{01}), {\\rm Lerp}(t,u_{10},u_{11})) \\) </p> \
	<h3> MipMap </h3> \
	<p> Allowing fast, approximate and square range queries </p> \
	<ul> \
		<li> Additional storage: 1/3 </li> \
		<li> Limitation: overblur </li> \
	</ul> \
	<img width='500px' src='note_files/computer_graphics/mipmap.png'/> \
	<ol> \
		<li> Pre-store a hierarchy of different levels of raw images </li> \
		<li> Estimate texture coordinates \\( (u,v) \\) of neighboring screen samples \\( a_i \\) </li> \
		<li> <p> Computing mipmap level by the size of required range </p> \
		<p> $$ D=\\log_2{\\left\(\\max_{a_i}{\\sqrt{\\left\(\\frac{{\\rm d}u}{{\\rm d}a_i}\\right\)^2+\\left\(\\frac{{\\rm d}v}{{\\rm d}a_i}\\right\)^2}}\\right\)} \\hspace{100cm} $$ </p> </li> \
		<li> <p> Query the texel in level \\( D \\) by bilinear interpolation </p> \
		<p> <b>Trilinear Interpolation</b>: Linear interpolation based on bilinear results of level \\( D \\) and \\( D+1 \\) </p> </li> \
	</ol> \
	<h3> Anisotropic Filtering </h3> \
	<p> Ripmap: axis-aligned rectangle zones </p> \
	<ul> \
		<li> Additional storage: 3x </li> \
		<li> Limitation: diagonal zones </li> \
	</ul> \
	<img width='200px' src='note_files/computer_graphics/anisotropic_filtering.png'/> \
	<h3> EWA Filtering </h3> \
	<p> Multiple lookups, weighted average </p> \
	<img width='150px' src='note_files/computer_graphics/ewa_filtering.png'/> \
	<h3> Environment Mapping </h3> \
	<p> Map environment lighting into a texture (light from different directions) </p> \
	<ul> \
		<li> Spherical map </li> \
		<li> Cube map (6 faces): bounding box of a sphere; the light from the sphere hit the cube face </li> \
	</ul> \
	<h3> Bump/Normal Mapping </h3> \
	<p> Fake the detailed geometry without adding more triangles </p> \
	<p> Perturb surface normal per pixel (for shading computation only) by height shift per texel defined by a texture </p> \
	<ol> \
		<li> Original surface normal \\( {\\bf n_p}=(0,0,1) \\) </li> \
		<li> <p> Derivatives at \\( {\\bf p} \\) are </p> \
		<p> $$ \\frac{{\\rm d}{\\bf p}}{{\\rm d}u}=c_1(h(u+1)-h(u)) \\hspace{100cm} $$ </p> \
		<p> $$ \\frac{{\\rm d}{\\bf p}}{{\\rm d}v}=c_1(h(v+1)-h(v)) \\hspace{100cm} $$ </p> </li> \
		<li> <p> Perturbed normal is </p> \
		<p> $$ {\\bf n}=\\left\(-\\frac{{\\rm d}⁡{\\bf p}}{{\\rm d}⁡u} ,-\\frac{{\\rm d}⁡{\\bf p}}{{\\rm d}⁡v},1\\right\).{\\rm normalized} \\hspace{100cm} $$ </li> \
	</ol> \
	<img width='300px' src='note_files/computer_graphics/bump_mapping.png'/> \
	<h3> Displacement Mapping </h3> \
	<p> Use the same texture as in bump mapping </p> \
	<p> Actually moves the heights of vertices (need triangles to be small enough) </p> \
	<h3> 3D Procedural Noise + Solid Modeling </h3> \
	<p> <a href=''> Procedural Appearance </a> </p> \
	<p> 3D texture generated by 3D function </p> \
	<p> e.g., Perlin noise </p> \
	<h3> Ambient Occlusion Texture Map </h3> \
	<p> Precomputed shadow map (0-1), then multiply simple shading to generate ambient occlusion </p> \
	<h2> Geometry </h2> \
	<h3> Implicit Representation of Geometry </h3> \
	<p> Based on classify points – points satisfy some specified relationship </p> \
	<p> -&emsp;Hard to get all points on the surface </p> \
	<p> -&emsp;Easy to test points inside/outside/distance the surface </p> \
	<ul> \
		<li> Algebraic Surface: e.g., for point \\( (x,y,z) \\) where \\( f(x,y,z)=0 \\) </li> \
		<li> <p> Constructive Solid Geometry: combine implicit geometry via Boolean operations </p> \
		<img width='500px' src='note_files/computer_graphics/implicit_geometry.png'/> </li> \
		<li> Signed Distance Function: given minimum distance (+/-) from anywhere to object; good for blending </li> \
		<li> Fractals: exhibit self-similarity, detail at all scales </li> \
	</ul> \
";
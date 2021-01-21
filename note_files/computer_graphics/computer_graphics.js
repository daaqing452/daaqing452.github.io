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
	<img width='150px' src='note_files/computer_graphics/orthographic_projection_0.png'/> \
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
	<img width='400px' src='note_files/computer_graphics/perspective_projection_0.png'/> \
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
	<h3> <span class='badge badge-secondary'>[Basic]</span> Convolution Theorem </h3> \
	<p> Convolution in spatial domain = Multiplication in frequency domain </p> \
	<p> Convolution in frequency domain = Multiplication in spatial domain </p> \
	<h3> <span class='badge badge-secondary'>[Basic]</span> Sampling <h3> \
";
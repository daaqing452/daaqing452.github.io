var str_geometry_modeling = "\
	<h1> 几何建模与处理 </h1> \
	<p> <b>GAMES 102</b>: [<a href='https://www.bilibili.com/video/BV1NA411E7Yr'>bilibili</a>] [<a href='http://staff.ustc.edu.cn/~lgliu/'>刘利刚</a>] [<a href='http://games-cn.org/'>GAMES</a>] </p> \
	<p> Update v0: 2021.04.06 </p> \
	<h2> 数据拟合 </h2> \
	<h3> Weierstrass 逼近定理 </h3> \
	<p> 定理一：闭区间上的连续函数可用多项式级数一致逼近 </p> \
	<p> 定理二：闭区间上周期为\\( 2\\pi \\)的连续函数可用三角函数级数一致逼近 </p> \
	<h3> Fourier级数 </h3> \
	\\begin{align} \
	f(t) &= A_0+\\sum_{i=1}^{\\infty}[a_n\\cos(n\\omega t)+b_n\\sin(n\\omega t)] \\\\ \
	&= A_0+\\sum_{i=1}^{\\infty}A_n\\sin(n\\omega t+\\psi_n) \
	\\end{align} \
	<h3> 插值 </h3> \
	<p> 目标：函数\\(f\\)需要经过每个数据点（零误差） </p> \
	$$ y_i=f(x_i) $$ \
	<p> 选择一组\\(n+1\\)个基函数\\(B_k\\)，求解线性方程组解\\(a_k\\) \
	$$ \\sum_{i=0}^n{a_kB_k(x_i)=y_i} $$ \
	$$ \\begin{bmatrix} \
		B_0(x_0) & B_1(x_0) & \\cdots & B_n(x_0) \\\\ \
		B_0(x_1) & B_1(x_1) & \\cdots & B_n(x_1) \\\\ \
		\\vdots  & \\vdots  & \\ddots & \\vdots  \\\\ \
		B_0(x_n) & B_1(x_n) & \\cdots & B_n(x_n) \\\\ \
	\\end{bmatrix} \
	\\begin{bmatrix} a_0 \\\\ a_1 \\\\ \\vdots \\\\ a_n \\end{bmatrix} \
	= \\begin{bmatrix} y_0 \\\\ y_1 \\\\ \\vdots \\\\ y_n \\end{bmatrix} $$ \
	<h4> 多项式插值 </h4> \
	<p> 选择幂基 \\(1,x,x^2,\\cdots,x^n\\) </p> \
	<p> 系数矩阵为Vandermonde矩阵，方程有唯一解 </p> \
	<h4> Language插值 </h4> \
	$$ P(x)=\\sum_{i=0}^n{y_il_i(x)} $$ \
	<p> 其中 </p> \
	$$ l_i(x_j) = \\left\\{ \\begin{align} 1\\quad & 若i=j \\\\ 0\\quad & 若i\\neq j \\end{align} \\right. \\ \\ \\ $$ \
	$$ l_i(x) = \\frac{\\prod_{j\\neq i}(x-x_j)}{\\prod_{j\\neq i}(x_i-x_j)} $$ \
	<h4> Newton插值 </h4> \
	<p> 具有相同“导数”（差商）的多项式，构造\\(n\\)阶Taylor展开 </p> \
	<p> 一阶差商 </p> \
	$$ f[x_0,x_1]=\\frac{f(x_1)-f(x_0)}{x_1-x_0} $$ \
	<p> \\(k\\)阶差商 </p> \
	$$ f[x_0,x_1,\\cdots,x_k]=\\frac{f[x_1,\\cdots,x_k]-f[x_0,\\cdots,x_{k-1}]}{x_k-x_0} $$ \
	<p> Newton插值多项式为 </p> \
	$$ N_n(x)=f(x_0)+f[x_0,x_1](x-x_0)+\\cdots+f[x_0,x_1,\\cdots,x_n](x-x_0)\\cdots(x-x_{n-1}) $$ \
	<h4> 正交多项式基 </h4> \
	<p> 系数交替，互相抵消，避免病态问题 </p> \
	<p> Gram‐Schmidt 正交化 </p> \
	<h3> 插值的病态问题 </h3> \
	<p> 系数矩阵条件数高，求解不稳定，细微变化导致输出解的剧烈变化（过拟合） </p> \
	<p> Vandermonde矩阵条件数随着数据点\\(n\\)呈指数级增长 </p> \
	<h4> 条件数 </h4> \
	<p> 最大特征值和最小特征值之间的比例 </p> \
	<p> 条件数大意味着基元之间有太多的相关性 </p> \
	$$ \\kappa_2(\\bf A)=\\frac{\\max_{x\\neq 0}{\\frac{||{\\bf A}x||}{||x||}}}{\\min_{x\\neq 0}{\\frac{||{\\bf A}x||}{||x||}}} $$ \
	<h4> Runge 现象 </h4> \
	<p> 震荡现象对插值点数的高敏感性 </p> \
	<h3> 逼近（最小二乘法） </h3> \
	<p> 目标：函数\\(f\\)最小化与数据点的L2误差 </p> \
	$$ f=\\mathop{\\arg\\min}_{f\\in \\text{span}(B)}{\\sum_{j=1}^m{(f(x_j)-y_j)^2}} $$ \
	<p> 令 </p> \
	$$ {\\bf M}=\\begin{bmatrix} \
	x_0^{(0)} & x_0^{(1)} & \\cdots & x_0^{(n)} \\\\ \
	x_1^{(0)} & x_1^{(1)} & \\cdots & x_1^{(n)} \\\\ \
	\\vdots   & \\vdots   & \\ddots & \\vdots   \\\\ \
	x_m^{(0)} & x_m^{(1)} & \\cdots & x_m^{(n)} \\\\ \
	\\end{bmatrix} $$ \
	<p> 则最小解满足 </p> \
	$$ {\\bf A}=\\left\( {\\bf M}^{\\top}{\\bf M} \\right\)^{-1}{\\bf M}^{\\top}y $$ \
	<h3> Bernstein多项式 </h3> \
	$$ b_{n,j}=\\left\( \\begin{align} n \\\\ j \\end{align} \\right\) x_j(1-x)^{n-j} $$ \
	<p> <img width='450px' src='note_files/geometry_modeling/bernstein0.png'/>&emsp; \
	<img width='450px' src='note_files/geometry_modeling/bernstein1.png'/> </p> \
	<p> 性质： </p> \
	<ul> <li> 正性、权性（和为1） => 凸包性 </li> \
	<li> 稳定性 </li> \
	<li> 递归线性求解方法 </li> </ul> \
	<h3> RBF </h3> \
	<p> RBF（径向基函数，Radial Basis Function） </p> \
	<p> Gauss拟合函数的组合 </p> \
	$$ \\begin{align} f(x) &= w_0+\\sum_{i=0}^n{w_i\\mathcal{G}_i(x)} \\\\ \
	&= w_0+\\sum_{i=0}^n{w_i\\mathcal{G}_{0,1}{(a_ix+b_i)}} \\end{align} $$ \
	<p> <img width='800px' src='note_files/geometry_modeling/rbf0.png'/> </p> \
	<ul> <li> RBF等同于单层神经网络 </li> \
	<li> 深度神经网络拟合的本质上是叠加更多的自由度+调参 </li> </ul> \
	<p> <img width='350px' src='note_files/geometry_modeling/rbf1.png'/> </p> \
	<h4> Gauss拟合函数 </h4> \
	$$ \\mathcal{G}_{\\mu,\\sigma}(x)=\\frac{1}{\\sqrt{2\\pi}}e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}=\\mathcal{G}_{0,1} \\left\( \\frac{1}{\\sigma}x-\\frac{\\mu}{\\sigma} \\right\) $$ \
	<p> 不同均值和方差的Gauss函数都线性无关 </p> \
	<p> 与Gauss函数相比少一个\\(1/\\sigma\\) </p> \
	<h3> 正则化 </h3> \
	<p> 避免过拟合 </p> \
	<h4> 岭回归正则项 </h4> \
	$$ \\min_{\\bf W}{||{\\bf Y-WX}||^2}+\\mu||{\\bf W}||_2^2 $$ \
	<h4> 稀疏正则化 </h4> \
	<p> 解决冗余基函数（过完备） </p> \
	$$ \\min_{\\bf W}{||{\\bf Y-WX}||^2}+\\mu||{\\bf W}||_0 $$ \
	<p> 可以用于压缩：将数据\\(\\bf X\\)压缩为\\(\\bf Y\\) </p> \
	<h3> 张量积空间 </h3> \
	<p> 两个一元函数的基函数相互乘积 </p> \
	<p> 二元二次函数基函数空间为：\\( \\{ 1,x,y,x^2,y^2,xy \\} \\) </p> \
	<p> 一般张量积空间：\\( \\{ b_i(u)b_j(v) \\}, \\quad i,j\\in[0,n] \\) </p> \
	<h3> 映射 </h3> \
	$$ f:\\mathbb{R}^n\\rightarrow\\mathbb{R}^m $$ \
	<p> 其中，\\(n\\)是本征维度，\\(n\\)是映射空间维度 </p> \
	<table> \
		<tr> <td class='table_padding20'> - </td> <td> 向量值函数： </td> <td> \\( f:\\mathbb{R}^1\\rightarrow\\mathbb{R}^m \\) </td> </tr> \
		<tr> <td> - </td> <td> 参数曲线： </td> <td> \\( f:\\mathbb{R}^1\\rightarrow\\mathbb{R}^2或\\mathbb{R}^3 \\) </td> </tr> \
		<tr> <td> - </td> <td> 参数曲面： </td> <td> \\( f:\\mathbb{R}^2\\rightarrow\\mathbb{R}^3 \\) </td> </tr> \
	</table> \
	<p> <img width='400px' src='note_files/geometry_modeling/mapping.png'/> </p> \
	<h3> 参数化 </h3> \
	<p> 给定平面上系列点\\(p_i=(x_i,y_i)\\)，得到参数曲线 </p> \
	$$ \\left\\{ \\begin{align} x=x(t) \\\\ y=y(t) \\end{align} \\right. , \\quad t\\in[0,1] $$ \
	<p> 将\\(t\\)参数化，对\\((t_i,x_i)\\)和\\(t_i,y_i\\)分别求解 </p> \
	<table> \
		<tr> <td class='table_padding20'> - </td> <td> 均匀参数化： </td> <td> \\(t_{i+1}-t_i=\\text{const.}\\)；\\(t_i=i\\) </td> </tr> \
		<tr> <td> - </td> <td> 弦长参数化： </td> <td> \\( t_{i+1}-t_i=||p_{i+1}-p_i|| \\) </td> </tr> \
		<tr> <td> - </td> <td> 中心参数化： </td> <td> \\( t_{i+1}-t_i=\\sqrt{||p_{i+1}-p_i||} \\) </td> </tr> \
		<tr> <td> - </td> <td> Foley-Nielsen参数化： </td> <td> \\(t_{i+1}-t_i=||p_{i+1}-p_i||\\cdot\\left\( 1+\\frac{3}{2}\\frac{\\hat{\\alpha}_i||p_i-p_{i-1}||}{||p_i-p_{i-1}||+||p_{i+1}-p_i||}+\\frac{3}{2}\\frac{\\hat{\\alpha}_{i+1}||p_{i+1}-p_i||}{||p_{i+1}-p_i||+||p_{i+2}-p_{i+1}||} \\right\) \\) </tr> </tr> \
		<tr> <td> </td> <td> </td> <td> 其中\\( \\alpha_i=\\angle_{(p_{i-1},p_i,p_{i+1})} \\)，\\( \\hat{\\alpha}_i=\\min{\\left\( \\pi-\\alpha_i, \\frac{\\pi}{2} \\right\)} \\) </td> </tr> \
	</table> \
";

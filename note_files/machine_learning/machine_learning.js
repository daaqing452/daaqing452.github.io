var str_machine_learning = "\
	<h1> 机器学习 </h1> \
	<p> 教材：<a href='./note_files/machine_learning/《机器学习》.pdf'>《机器学习》</a> </p> \
	<p> Update v0: 2021.01.16 </p> \
	<h2> 模型评估与选择 </h2> \
	<h3> 自助采样法（Bootstrap Sampling） </h3> \
	<ol> \
		<li> 给定包含\\(m\\)个样本数据集\\(D\\) </li> \
		<li> 每次随机从\\(D\\)中挑选一个样本，拷贝放入\\(D^{'}\\)，使得该样本在下次采样中仍能采到</li> \
		<li> 重复这个过程\\(m\\)次，得到了包含\\(m\\)个样本的数据集\\(D^{'}\\)</li> \
		<li> 可将\\(D^{'}\\)作为训练集，\\(D-D^{'}\\)作为测试集 </li> \
	</ol> \
	<p> 样本在\\(m\\)次采样中都没被采到的概率： </p> \
	$$ \\lim_{m\\rightarrow\\infty}{\\left\( 1-\\frac{1}{m} \\right\)} \\rightarrowtail \\frac{1}{e} \\approx 0.368 $$ \
	<h3> F1度量 </h3> \
	<p> Precision和Recall的调和平局（更注重较小值） </p> \
	$$ \\begin{align} \\frac{1}{F_1} &= \\frac{1}{2}\\cdot\\left\( \\frac{1}{P}+\\frac{1}{R} \\right\) \\\\ \
	\\frac{1}{F_\\beta} &= \\frac{1}{1+\\beta^2}\\cdot\\left\( \\frac{1}{P}+\\frac{\\beta^2}{R} \\right\) \\end{align}  $$ \
	<h3> ROC、AUC </h3> \
	$$ \\begin{align} \\alpha_{TP} &= \\frac{TP}{TP+FN} \\\\ \
	\\alpha_{FP} &= \\frac{FP}{TN+FP} \\end{align} $$ \
	<p> ROC曲线： </p> \
	<div style='text-align:center'><img align='middle' width='250px' src='note_files/machine_learning/roc.png'/></div> \
	<p> AUC：ROC曲线下面积 </p> \
	<h2> 线性模型 </h2> \
	<h3> 线性回归/最小二乘法 </h3> \
	<p> 目标学得参数\\(w,b\\)，使得\\(f(x_i)=wx_i+b\\simeq y_i\\)，即均方误差（欧氏距离）最小 </p> \
	$$ (w^*,b^*) = \\mathop{\\arg\\min}_{(w,b)}{\\sum_{i=1}^m{\\left\( f(x_i)-y_i \\right\)^2}} $$ \
	<p> 最小二乘法：</p> \
	$$ \\hat{\\pmb w}=(w;b) &emsp;&emsp; {\\bf X}=\\begin{pmatrix} x_1^\\top & 1 \\\\ \\vdots & \\vdots \\\\ x_m^\\top & 1 \\end{pmatrix} $$ \
	$$ \\hat{\\pmb w}^*=\\left\( {\\bf X}^\\top{\\bf X} \\right\)^{-1}{\\bf X}^\\top y $$ \
	<p> 当\\( {\\bf X}^\\top{\\bf X} \\)不满秩的时候引入正则化 </p> \
	<h3> Logistic回归 </h3> \
	<p> Sigmoid函数： </p> \
	$$ \\begin{align} \\sigma(x) &= \\frac{1}{1+e^{-(w^\\top x+b)}} \\\\ \\sigma^{'}(x) &= \\sigma(x)\\left\( 1-\\sigma(x) \\right\) \\end{align} $$ \
	<div style='text-align:center'><img width='300px' src='note_files/machine_learning/logistic.png'/></div> \
	<p> 对数几率（logit）： </p> \
	$$ \\ln{\\frac{y}{1-y}}=\\ln{\\frac{P(y=1|x)}{P(y=0|x)}}=w^\\top x+b $$ \
	<p> 则有 </p> \
	$$ P(y=1|x)=\\frac{e^{w^\\top x + b}}{1+e^{w^\\top x + b}} $$ \
	$$ P(y=0|x)=\\frac{1}{1+e^{w^\\top x + b}} $$ \
	<p> 最大化对数似然 </p> \
	$$ \\begin{align} \\ell(\\hat{\\pmb w}) &= \\sum_{i=1}^m{\\ln{P(y_i|x_i;\\hat{\\pmb w})}} = y_iP(y=1|x_i;\\hat{\\pmb w})+(1-y_i)P(y=0|x_i;\\hat{\\pmb w}) \\\\ \
	\\hat{\\pmb w}^* &= \\mathop{\\arg\\min}_{\\hat{\\pmb w}}\\ell(\\hat{\\pmb w}) \\end{align} $$ \
	<p> 凸函数，无解析解，使用迭代方法求解 </p> \
	<h3> 线性判别分析（Linear Discriminant Analysis，LDA） </h3> \
	<ul> \
		<li> \
			<p> 思想：将样本投影到一条直线上，使得同类样本的投影点尽可能接近，异类样本的投影点尽可能远 </p> \
			<div style='text-align:center'><img width='300px' src='note_files/machine_learning/lda.png'/></div> \
		</li> \
		<li> \
			<p> 最大化“广义瑞利商”： </p> \
			$$ J=\\frac{||w^\\top\\mu_0-w^\\top\\mu_1||_2^2}{w^\\top\\Sigma_0w+w^\\top\\Sigma_1w} = \\frac{w^\\top S_bw}{w^\\top S_ww} $$ \
			<p> 其中\\(\\mu_i\\)为均值向量，\\(w^\\top\\mu_i\\)为投影点（实数）， \\(\\Sigma_i\\)为协方差矩阵 </p> \
			<p> -&emsp; 类间散度矩阵：\\( S_b=(\\mu_0-\\mu_1)(\\mu_0-\\mu_1)^\\top \\) </p> \
			<p> -&emsp; 类内散度矩阵：\\( S_w=\\Sigma_0+\\Sigma_1=\\sum_i{\\sum_{x\\in D_i}{(x-\\mu_i)(x-\\mu_i)^\\top}} \\) </p> \
			<p> 由于\\(w\\)长度可变，则等价于 </p> \
			$$ \\begin{align} \\min_w &emsp; & -w^\\top S_bw \\\\ \\text{s.t.} &emsp; & w^\\top S_ww=1 \\end{align} $$ \
			<p> 利用拉格朗日乘子，等价于 </p> \
			$$ S_bw=\\lambda_1S_ww $$ \
			<p> 由于\\( S_bw=(\\mu_0-\\mu_1)(\\mu_0-\\mu_1)^\\top w=(\\mu_0-\\mu_1)\\lambda_2 \\)，故 </p> \
			$$ w=S_w^{-1}(\\mu_0-\\mu_1) $$ \
 		</li> \
 		<li> \
 			<p> 多分类：假设\\(N\\)分类，第\\(i\\)类样本数为\\(m_i\\) </p> \
 			$$ \\begin{align} S_w &= \\sum_{i=1}^N{S_{w_i}}=\\sum_{i=1}^N{\\sum_{x\\in D_i}{(x-\\mu_i)(x-\\mu_i)^\\top}} \\\\ \
 			S_b &= \\sum_{i=1}^N{m_i(\\mu_i-\\mu)(\\mu_i-\\mu)^\\top} \\end{align} $$ \
 			<p> 优化目标为 </p> \
 			$$ \\max_W{\\frac{{\\rm tr}\\left\( W^\\top S_bW \\right\)}{{\\rm tr}\\left\( W^\\top S_wW \\right\)}} $$ \
 			<p> 则 </p> \
 			$$ W=S_w^{-1}S_b $$ \
 			<p> 其中\\( W\\in\\mathbb{R}^{d\\times(N-1)} \\)为一个投影矩阵，将样本投影到\\(N-1\\)维空间（降维）</p> \
 		</li> \
	</ul> \
	<h2> 决策树 </h2> \
	<p> 典型决策树：ID3、C4.5、CART </p> \
	<table cellpadding='5px' width='100%'> \
		<tr style='border-top:2px solid #000000; border-bottom:1px solid #000000;'> \
		<td style='width:60px'> 算法： </td> \
		<td> TreeGenerate\\((D,A)\\) </td> \
		</tr> <tr style='border-bottom:2px solid #000000;'> <td colspan='2'> \
		<code>if </code>\\(D\\)中所有样本全都属于同一类\\(C\\)<code> then</code> <br/> \
		<code>&nbsp;&nbsp;&nbsp; </code>标记该结点为\\(C\\) <br/> \
		<code>&nbsp;&nbsp;&nbsp; return</code> <br/> \
		<code>if </code>特征\\(A=\\varnothing\\)<code> or </code>\\(D\\)中样本在\\(A\\)上取值相同<code> then </code> <br/> \
		<code>&nbsp;&nbsp;&nbsp; </code>标记该结点为\\(D\\)中样本最多的类 <br/> \
		<code>&nbsp;&nbsp;&nbsp; return</code> <br/> \
		在\\(A\\)中选择最优划分属性\\(a^*\\)（例如：信息增益最大）<br/> \
		<code>if </code>\\(D_{a^*}=\\varnothing\\)<code> then</code> <br/> \
		<code>&nbsp;&nbsp;&nbsp; </code>标记该分支为\\(D\\)中样本最多的类 <br/> \
		<code>&nbsp;&nbsp;&nbsp; return</code> <br/> \
		<code>for </code>取值\\(v^*\\)<code> in </code>\\(a^*\\) <br/> \
		<code>&nbsp;&nbsp;&nbsp; </code>TreeGenerate\\( \\left\(D_{v^*}, A-\\\{a^*\\\}\\right\) \\) \
		</td> </tr> \
	</table> \
	<ul> \
		<li> <p> 划分最优属性选择 </p> \
		<ul> \
			<li> <p> 信息增益（按某特征\\(a=\\\{a^1,a^2,\\cdots,a^V\\\}\\)划分后获得的信息增益，基于信息熵）：</p> \
			$$ \\begin{align} \\text{Gain}(D,a) &= \\text{Ent}(D)-\\sum_{v=1}^V{\\frac{|D^v|}{|D|}\\text{Ent}(D^v)} \\\\ \
			\\text{Ent}(D) &= -\\sum_{k=1}^{|\\mathcal{Y}|}{p_k\\log_2{p_k}} \\end{align} $$ \
			<p> 其中\\(D^v\\)为\\(D\\)中特征\\(a\\)等于\\(a^v\\)的样本集合；\\(p_k\\)为\\(D\\)中第\\(k\\)类样本的比例 </p> </li> \
			<li> <p> 信息增益率（弱化特征的取值数目产生的影响）： </p> \
			$$ \\begin{align} \\text{Gain.ratio}(D,a) &= \\frac{\\text{Gain}(D,a)}{\\text{IV}(a)} \\\\ \
			\\text{IV}(a) &= -\\sum_v^V{\\frac{|D^v|}{|D|}\\log_2{\\frac{|D^v|}{|D|}}} \\end{align} $$ \
		</ul> </li> \
		<li> 剪枝：将某棵子树合并后，正确率是否有提升 </li> \
		<li> <p> 连续值处理：特征a出现的值排序\\(\\\{a^1,a^2,\\cdots,a^v\\\}\\)，将相邻值的中位点集合\\(T_a=\\left\\\{\\left.\\frac{a^i+a^{i+1}}{2}\\right|1\\le i\\le n\\right\\\}\\)作为划分点；连续属性划分后还可以作为后代结点的划分 </p> \
		$$ \\text{Gain}(D,a)=\\max_{t\\in T_a}{\\text{Gain}(D,a,t)}=\\max_{t\\in T_a}{\\left\( \\text{Ent}(D)-\\sum_{\\lambda\\in\\\{-,+\\\}}{\\frac{|D^{\\lambda,t}|}{|D|}\\text{Ent}(D^{\\lambda,t})} \\right\)} $$ </li> \
		<li> <p> 缺失值处理： </p> \
		<p> 令\\( \\widetilde{D} \\)为没有缺失值的样本；\\( w_x \\)为样本\\(x\\)的权重 </p> \
		<table> \
			<tr> \
			<td> 无缺失样本所占比例： </td> \
			<td> $$ \\rho=\\frac{\\sum_{x\\in\\widetilde{D}}{w_x}}{\\sum_{x\\in D}{w_x}} $$ \ </td> \
			</tr> <tr> \
			<td> 无缺失样本中第\\(k\\)类的比例：</td> \
			<td> $$ p_k=\\frac{\\sum_{x\\in\\widetilde{D}_k}{w_x}}{\\sum_{x\\in\\widetilde{D}}{w_x}} $$ </td> \
			</tr> <tr> \
			<td class='table_padding20'> 无缺失样本中在特征\\(a\\)上取值为\\(v\\)的比例： </td> \
			<td> $$ r^v=\\frac{\\sum_{x\\in\\widetilde{D}_k}{w_x}}{\\sum_{x\\in\\widetilde{D}}{w_x}} $$ </td> \
			</tr> \
		</table> \
		<p> 信息增益： </p> \
		$$ \\begin{align} \\text{Gain}(D,a) &= \\rho\\times\\text{Gain}(\\widetilde{D},a)=\\rho\\times\\left\( \\text{Ent}(\\widetilde{D})-\\sum_{v=1}^{V}{r^v\\text{Ent}\\left\(\\widetilde{D}^v\\right\)} \\right\) \\\\ \
		\\text{Ent}(\\widetilde{D}) &= -\\sum_{k=1}^{|\\mathcal{Y}|}{p_k\\log_2{p_k}} \\end{align} $$ \
	</ul> \
	<h2> 支持向量机（Support Vector Machine，SVM） </h2> \
	<p> 超平面：\\( {\\pmb w}^\\top{\\pmb x}+b=0 \\)， \\( \\begin{cases} {\\pmb w}^\\top{\\pmb x}+b\\ge+1 & y_i=+1 正例 \\\\ {\\pmb w}^\\top{\\pmb x}+b\\le -1 & y_i=-1 负例 \\end{cases} \\)，等号成立的样本为支持向量 </p> \
	<p> 离超平面距离：\\( r=\\frac{\\left| {\\pmb w}^\\top{\\pmb x}+b \\right|}{||w||} \\) </p> \
	<div style='text-align:center'><img align='middle' width='250px' src='note_files/machine_learning/svm.png'/></div> \
	<h3> SVM基本型 </h3> \
	<p> 最大化支持向量间隔\\( \\gamma=\\frac{2}{||{\\pmb w}||} \\)，即 </p> \
	$$ \\begin{align} \\min_{{\\pmb w},b}&emsp; & \\frac{1}{2}||{\\pmb w}||^2 \\\\ \
	\\text{s.t.}&emsp; & y_i\\left\({\\pmb w}^\\top{\\pmb x}+b\\right\)\\ge 1 \\end{align} $$ \
	<ol> \
		<li> <p> 拉格朗日乘子法： </p> \
		$$ \\mathcal{L}({\\pmb w},b,{\\pmb\\alpha})=\\frac{1}{2}||{\\pmb w}||^2+\\sum_{i=1}^m{\\alpha_i\\left\( 1-y_i\\left\( {\\pmb w}^\\top{\\pmb x}_i+b \\right\) \\right\)} $$ \
		<p> 其中\\( {\\pmb\\alpha}=\\\{\\alpha_i\\ge 0\\\} \\)为拉格朗日乘子 </p> \
		<p> KKT条件：\\(\\alpha_i\\ge 0\\)，\\(y_i\\left\({\\pmb w}^\\top{\\pmb x}_i+b\\right\)-1\\ge 0\\)，且两者其中必有一项\\(=0\\) </p> </li> \
		<li> <p> \\(\\mathcal{L}({\\pmb w},b,{\\pmb\\alpha})\\)对\\({\\pmb w},b\\)求偏导为\\(0\\)可得： </p> \
		$$ {\\pmb w}=\\sum_{i=1}^m{\\alpha_iy_i{\\pmb x}_i} &emsp;&emsp; 0=\\sum_{i=1}^m{\\alpha_iy_i} $$ </li> \
		<p> 求出\\({\\pmb\\alpha}\\)后即可得到 </p> \
		$$ f({\\pmb x})={\\pmb w}^\\top{\\pmb x}+b=\\sum_{i=1}^m{\\alpha_iy_i{\\pmb x}_i^\\top{\\pmb x}}+b $$ \
		<li> <p> 转化为对偶问题：</p> \
		$$ \\begin{align} \\max_{\\pmb\\alpha} &emsp; & \\sum_{i=1}^m{\\alpha_i}-\\frac{1}{2}\\sum_{i=1}^m{\\sum_{j=1}^m{\\alpha_i\\alpha_jy_iy_j{\\pmb x}_i^\\top{\\pmb x}_j}} \\\\ \
		\\text{s.t.} &emsp; & \\sum_{i=1}^m{\\alpha_iy_i}=0 &emsp; \\\\ \
		& \\alpha_i\\ge 0 \\end{align} $$ </li> \
		<li> <p> SMO迭代算法求解： </p> \
		<p> 选取一对\\(\\alpha_i,\\alpha_j\\)，固定其他参数 </p> \
		<p> 由于\\( \\sum_{i=1}^m{\\alpha_iy_i}=0 \\)，消去\\(\\alpha_j\\)，得到一个关于\\(\\alpha_i\\)的单变量二次规划问题，仅有的约束\\(\\alpha_i\\ge 0\\) </p> \
		<p> 求\\(\\alpha_i\\)的闭式解，更新\\(\\alpha_i,\\alpha_j\\) </p> \
		$$ b=\\frac{1}{|S|}\\sum_{s\\in |S|}{\\left\( y_s-\\sum_{i\\in S}{\\alpha_iy_i{\\pmb x}_i^\\top{\\pmb x}_s} \\right\)} $$ </li> \
	</ol> \
	<h3> 核函数 </h3> \
	<p> 将样本映射到高维特征空间中解决线性不可分：\\(f(x)={\\pmb w}^\\top\\phi({\\pmb x})+b\\)，对偶问题： </p> \
	$$ \\max_{\\pmb\\alpha}{\\sum_{i=1}^m{\\alpha_i}-\\frac{1}{2}\\sum_{i=1}^m{\\sum_{j=1}^m{\\alpha_i\\alpha_jy_iy_j\\phi({\\pmb x}_i)^\\top\\phi({\\pmb x}_j)}}} $$ \
	<p> 核函数（内积）：\\( \\kappa({\\pmb x}_i,{\\pmb x}_j)=\\left\\langle \\phi({\\pmb x}_i),\\phi({\\pmb x}_j) \\right\\rangle = \\phi({\\pmb x}_i)^\\top\\phi({\\pmb x}_j) \\) </p> \
	$$ f({\\pmb x})=\\sum_{i=1}^m{\\alpha_iy_i\\kappa({\\pmb x},{\\pmb x}_i)}+b $$ \
	<p> <span class='badge badge-dark' style='font-weight:normal'>定理</span> 对称函数\\(\\kappa\\)是核函数当且仅当对于任意数据，核矩阵\\({\\bf K}=\\left[\\cdots\\kappa({\\pmb x}_i,{\\pmb x}_j)\\cdots\\right]\\)总是半正定的 </p> \
	<p> 常用核函数： </p> \
	<table cellpadding='5px'> \
		<tr style='border-top:1px solid #000000; border-bottom:1px solid #000000'> \
			<td> 名称 </td> \
			<td> 表达式\\( \\kappa({\\pmb x}_i,{\\pmb x}_j) \\) </td> \
		</tr> <tr> \
			<td> 多项式核 </td> \
			<td> \\( \\left\( {\\pmb x}_i^\\top{\\pmb x}_j \\right\)^d \\) </td> \
		</tr> <tr class='table_padding20'> \
			<td> 高斯核（RBF） </td> \
			<td> $$ \\exp{\\left\( -\\frac{||{\\pmb x}_i-{\\pmb x}_j||^2}{2\\sigma^2} \\right\)} $$ </td> \
		</tr> <tr> \
			<td> 拉普拉斯核 </td> \
			<td> $$ \\exp{\\left\( -\\frac{||{\\pmb x}_i-{\\pmb x}_j||}{\\sigma} \\right\)} $$ </td> \
		</tr> <tr style='border-bottom:1px solid #000000;'> \
			<td> Sigmoid核 </td> \
			<td> \\( \\tanh{\\left\( \\beta{\\pmb x}_i^\\top{\\pmb x}_j+\\theta \\right)} \\) </td> \
		</tr> \
	</table> \
	<h3> 软间隔SVM </h3> \
	<ol> \
		<li> \
			<p> 最大化间隔的同时，不满足约束的样本尽可能少： </p> \
			$$ \\min_{{\\pmb w},b}{\\frac{1}{2}||{\\pmb w}||^2}+C\\sum_{i=1}^m{\\ell\\left\( y_i\\left\( {\\pmb w}^\\top{\\pmb x}_i+b \\right\)-1 \\right\)} $$ \
			<table> \
				<tr> <td> -&emsp; </td> <td> \\( \\ell_{0/1}(z) \\) </td> <td> 0/1损失 </td> </tr> \
				<tr> <td> -&emsp; </td> <td> \\( \\ell_{\\text{hinge}}(z)=\\max{(0,1-z)} \\) </td> <td> hinge损失 </td> </tr> \
				<tr> <td> -&emsp; </td> <td> \\( \\ell_{\\text{exp}}(z)=\\exp(-z) \\) </td> <td> 指数损失 </td> </tr> \
				<tr> <td> -&emsp; </td> <td class='table_padding20'> \\( \\ell_{\\text{log}}(z)=\\log{(1+\\exp{(-z)})} \\) </td> <td> 对率损失 </td> </tr> \
			</table> \
		</li> <li> \
			<p> 引入松弛变量\\(\\xi_i\\)：</p> \
			$$ \\begin{align} \\min_{{\\pmb w},b} &emsp; & \\frac{1}{2}||{\\pmb w}||^2+C\\sum_{i=1}^m{\\xi_i} \\\\ \
			\\text{s.t.} &emsp; & y_i\\left\( {\\pmb w}^\\top{\\pmb x}_i+b\\ge 1-\\xi_i \\right\) \\\\ \
			& \\xi_i\\ge 0 \\end{align} $$ \
		</li> <li> \
			<p> 拉格朗日乘子法： </p> \
			$$ \\mathcal{L}({\\pmb w},b,{\\pmb\\alpha},{\\pmb\\xi},{\\pmb\\mu})=\\frac{1}{2}||{\\pmb w}||^2+C\\sum_{i=1}^m{\\xi_i}+\\sum_{i=1}^m{\\alpha_i\\left\( 1-\\xi_i-y_i\\left\( {\\pmb w}^\\top{\\pmb x}_i+b \\right\) \\right\)} - \\sum_{i=1}^m{\\mu_i\\xi_i} $$ \
			<p> 其中\\({\\pmb\\alpha}=\\\{\\alpha_i\\ge 0\\\},{\\pmb\\mu}=\\\{\\mu_i\\ge 0\\\} \\)为拉格朗日乘子 </p> \
		</li> <li> \
			<p> \\( \\mathcal{L}({\\pmb w},b,{\\pmb\\alpha},{\\pmb\\xi},{\\pmb\\mu}) \\)对\\( {\\pmb w},b,\\xi_i \\)求偏导为\\(0\\)可得： </p> \
			$$ \\begin{align} {\\pmb w} &= \\sum_{i=1}^m{\\alpha_iy_i{\\pmb x}_i} \\\\ \
			0 &= \\sum_{i=1}^m{\\alpha_iy_i} \\\\ \
			C &= \\alpha_i+\\mu_i \\end{align} $$ \
		</li> <li> \
			<p> 对偶问题： </p> \
			$$ \\begin{align} \\max_{\\alpha} &emsp; & \\sum_{i=1}^m{\\alpha_i}-\\frac{1}{2}\\sum_{i=1}^m{\\sum_{j=1}^m{\\alpha_i\\alpha_jy_iy_j{\\pmb x}^\\top_i{\\pmb x}_j}} \\\\ \
			\\text{s.t.} &emsp; & \\sum_{i=1}^m{\\alpha_iy_i}=0 \\\\ \
			& 0\\le\\alpha_i\\le C \\end{align} $$ \
			<table> <tr> \
				<td style='padding-right:50px'> KKT条件：\\( \\begin{cases} \\alpha_i\\ge 0 \\\\ \\mu_i\\ge 0 \\\\ y_if({\\pmb x}_i)-1+\\xi_i\\ge 0 \\\\ \\alpha_i(y_if({\\pmb x}_i)-1+\\xi_i)=0 \\\\ \\xi_i\\ge 0 \\\\ \\mu_i\\xi_i=0 \\end{cases} \\) </td> \
				<td> <ul> \
					<li> 当\\( \\alpha=0 \\)，样本对结果无影响 </li> \
					<li> <p> 当\\( \\alpha>0 \\)，\\( y_if({\\pmb x}_i)=1+\\xi_i \\)，样本为支持向量 </p> \
					<ul> \
						<li> 当\\( \\alpha_i&lt;C \\)，则\\( \\mu_i>0 \\)，\\( \\xi_i=0 \\)，样本在最大间隔边界上 </li> \
						<li> <p> 当\\( \\alpha_i=C \\)，则\\( \\mu_i=0 \\)，样本跨越最大间隔边界 </p> \
						<ul style='list-style-type: disc'> \
							<li> 当\\(\\xi\\le 1\\)，样本落在最大间隔内部 </li> \
							<li> 当\\(\\xi>1\\)，样本被错误分类 </li> \
						</ul> </li> \
					</ul> </li> \
				</ul> </td> \
			</tr> </table> \
		</li> \
	</ol> \
	<h3> 支持向量回归（SVR） </h3> \
	<ol> \
		<li> <p> 衡量绝对值误差： </p> \
		$$ \\min_{{\\pmb w},b}{\\frac{1}{2}||{\\pmb w}||^2+C\\sum_{i=1}^m\\ell_{\\epsilon}(f({\\pmb x}_i)-y_i)} $$ \
		<p> 其中 </p> \
		$$ \\ell_{\\epsilon}(z) = \\begin{cases} 0 & \\text{if}\\\ |z|\\le\\epsilon \\\\ |z|-\\epsilon & \\text{otherwise} \\end{cases} $$ \
		</li> \
		<li> <p> 引入松弛变量\\(\\xi_i\\)和\\(\\hat{\\xi}_i\\)： </p> \
		$$ \\begin{align} \\min_{{\\pmb w},b} &emsp; & \\frac{1}{2}||{\\pmb w}||^2+C\\sum_{i=1}^m{\\left\(\\xi_i+\\hat{\\xi}_i\\right\)} \\\\ \
		\\text{s.t.} &emsp; & f({\\pmb x}_i)-y_i\\le\\epsilon+\\xi_i \\\\ \
		& y_i-f({\\pmb x}_i)\\le\\epsilon+\\hat{\\xi}_i \\\\ \
		& \\xi\\ge 0, \\hat{\\xi}_i\\ge 0 \\end{align} $$ \
		<li> <p> 拉格朗日乘子法： </p> \
		$$ \\mathcal{L}\\left\(\ {\\pmb w},b,{\\pmb\\alpha},\\hat{\\pmb\\alpha},{\\pmb\\xi},\\hat{\\pmb\\xi},{\\pmb\\mu},\\hat{\\pmb\\mu} \\right\) = \
		\\frac{1}{2}||{\\pmb w}||^2 + C\\sum_{i=1}^m{\\left\( \\xi_i+\\hat{\\xi}_i \\right\)} - \\sum_{i=1}^m{\\mu_i\\xi_i} - \\sum_{i=1}^m{\\hat{\\mu}_i\\hat{\\xi}_i} + \\sum_{i=1}^m{\\alpha_i(f({\\pmb x}_i)-y_i-\\epsilon-\\xi_i)} + \\sum_{i=1}^m{\\hat{\\alpha}_i\\left\( y_i-f({\\pmb x}_i)-\\epsilon-\\hat{\\xi}_i \\right\)} $$ \
		<p> 其中\\({\\pmb\\alpha}=\\\{\\alpha_i\\ge 0\\\},\\hat{\\pmb\\alpha}=\\\{\\hat{\\alpha}_i\\ge 0\\\},{\\pmb\\mu}=\\\{\\mu_i\\ge 0\\\},\\hat{\\pmb\\mu}=\\\{\\hat{\\mu}_i\\ge 0\\\} \\)为拉格朗日乘子 </p> </li> \
		<li> <p> \\( \\mathcal{L}\\left\(\ {\\pmb w},b,{\\pmb\\alpha},\\hat{\\pmb\\alpha},{\\pmb\\xi},\\hat{\\pmb\\xi},{\\pmb\\mu},\\hat{\\pmb\\mu} \\right\) \\)对\\( {\\pmb w},b,\\xi_i,\\hat{\\xi}_i \\)求偏导为0可得： </p> \
		$$ \\begin{align} {\\pmb w} &= \\sum_{i=1}^m{\\left\( \\hat{\\alpha}_i - \\alpha_i \\right\){\\pmb x}_i} \\\\ \
		0 &= \\sum_{i=1}^m{\\hat{\\alpha}_i-\\alpha_i} \\\\ \
		C &= \\alpha_i + \\mu_i \\\\ \
		C &= \\hat{\\alpha}_i + \\hat{\\mu}_i \\end{align} $$ </li> \
		<li> \
		<p> 对偶问题： </p> \
			$$ \\begin{align} \\max_{{\\pmb\\alpha},\\hat{\\pmb\\alpha}} &emsp; & \\sum_{i=1}^m{\\left\( y_i\\left\( \\hat{\\alpha}_i - \\alpha_i \\right\) - \\epsilon\\left\( \\hat{\\alpha}_i + \\alpha_i \\right\) \\right\)} - \\frac{1}{2}\\sum_{i=1}^m{ \\sum_{j=1}^m{ \\left\( \\hat{\\alpha}_i-\\alpha_i \\right\) \\left\( \\hat{\\alpha}_j-\\alpha_j \\right\) {\\pmb x}_i^\\top {\\pmb x}_j } } \\\\ \
			\\text{s.t.} &emsp; & \\sum_{i=1}^m{\\hat{\\alpha}_i-\\alpha_i}=0 \\\\ \
			& 0\\le\\alpha_i,\\hat{\\alpha}_i\\le C \\end{align} $$ \
			<table> <tr> \
				<td style='padding-right:50px'> KKT条件：\\( \\begin{cases} \\alpha(f({\\pmb x}_i)-y_i-\\epsilon-\\xi_i)=0 \\\\ \\hat{\\alpha}_i\\left\( y_i-f({\\pmb x}_i)-\\epsilon-\\hat{\\xi}_i \\right\) =0 \\\\ \\alpha_i\\hat{\\alpha}_i=0 \\\\ \\xi_i\\hat{\\xi}_i=0 \\\\ (C-\\alpha_i)\\xi_i=0 \\\\ (C-\\hat{\\alpha}_i)\\hat{\\xi}_i=0 \\end{cases} \\) </td> \
				<td> <ul> \
					<li> \\( f({\\pmb x}_i)-y_i-\\epsilon-\\xi_i=0 \\)，则\\( \\alpha_i>0, \\hat{\\alpha_i}=0 \\)，此时样本在\\(\\epsilon\\)隔带内 </li> \
					<li> \\( y_i-f({\\pmb x}_i)-\\epsilon-\\hat{\\xi}_i=0 \\)，则\\( \\alpha_i=0,\\hat{\\alpha}_i>0 \\)，此时样本在\\(\\epsilon\\)隔带内 </li> \
					<li> 当\\( \\alpha_i=\\hat{\\alpha}_i=0 \\)，样本在\\(\\epsilon\\)隔带外 </li> \
				</ul> </td> \
			</tr> </table> \
		</li> \
	</ol> \
	<h2> 贝叶斯分类器 </h2> \
	<p> 假设有\\(N\\)种类别\\(C=\\\{c_1,c_2,\\cdots,c_N\\\}\\)，基于后验概率\\(P(c|x)\\)得到将\\(x\\)分类为\\(c\\)的期望损失（条件风险）为 </p> \
	$$ R(c|x)=1-P(c|x) $$ \
	<p> 任务是寻找一个判定准则h最小化总体风险 </p> \
	$$ h^*(x)=\\mathop{\\arg\\min}_{c\\in C}{R(c|x)} $$ \
	<p>此时，\\(h^*\\)成为贝叶斯最优分类器，与之对应的总体风险\\(R(h^*)=\\mathbb{E}_x(R(h(x)|x))\\)成为贝叶斯风险，\\(1-R(h^*)\\)反映了分类器所能达到的最好性能，即通过机器学习产生模型精度的理论上限 </p> \
	<p> 对于生成式模型 </p> \
	$$ P(c|x)=\\frac{P(x,c)}{P(x)}=\\frac{P(c)P(x|c)}{P(x)} $$ \
	<p> 其中 </p> \
	<p> -&emsp; \\(P(c)\\)为类“先验”概率，根据大数定律，可以通过各类样本出现频率估计 </p> \
	<p> -&emsp; \\(P(x)\\)与类标记无关可以认为是常数 </p> \
	<p> -&emsp; \\(P(x|c)\\)为似然，由于可能多维向量\\(x\\)在数据中没有出现，无法直接使用出现频率进行估计 </p> \
	<h3> 极大似然估计 </h3> \
	<p> \\(P(x|c)\\)能被参数向量\\(\\theta_c\\)唯一确定，任务是利用训练集估计参数\\(\\theta_c\\)，即\\(P(x|c)=P(x|\\theta_c)\\) </p> \
	<p> 参数\\(\\theta_c\\)对于训练集\\(D\\)中类别为\\(c\\)的数据集\\(D_c\\)的似然为 </p> \
	$$ P(D_c|\\theta_c)=\\prod_{x\\in D_c}{P(x|\\theta_c)} $$ \
	<p> 取对数似然 </p> \
	$$ LL(\\theta_c)=\\log{P(D_c|\\theta_c)}=\\sum_{x\\in D_c}{\\log{P(x|\\theta_c)}} $$ \
	<p> 此时参数\\(\\theta_c\\)的极大似然估计\\(\\hat{\\theta}_c\\)为 </p> \
	$$ \\hat{\\theta}_c=\\mathop{\\arg\\max}_{\\theta_c}{LL(\\theta_c)} $$ \
	<p> 假设概率密度函数\\( p(x|c)\\sim\\mathcal{N}\\left\(\ \\mu_c,\\sigma_c^2 \\right\) \\)，则参数\\(\\mu_c\\)和\\(\\sigma_c^2\\)的极大似然估计为 </p> \
	$$ \\begin{align} \\hat{\\mu}_c &= \\frac{1}{|D_c|}\\sum_{x\\in D_c}{x} \\\\ \
	\\hat{\\sigma}_c^2 &= \\frac{1}{|D_c|}\\sum_{x\\in D_c}{\\left\( x-\\hat{\\mu}_c \\right\)\\left\( x-\\hat{\\mu}_c \\right\)^\\top} \\end{align} $$ \
	<h3> 朴素贝叶斯分类器（Naïve Bayesian） </h3> \
	<p> 属性条件独立性假设：\\(x\\)的\\(d\\)个属性相互独立 </p> \
	$$ h_{\\rm nb}(x)=\\mathop{\\arg\\max}_{c\\in C}{P(c|x)}=\\mathop{\\arg\\max}_{c\\in C}{\\frac{P(c)P(x|c)}{P(x)}}=\\mathop{\\arg\\max}_{c\\in C}{P(c)\\prod_{i=1}^d{P(x_i|c)}} $$ \
	<p> 其中 </p> \
	$$ P(c)=\\frac{|D_c|}{|D|} $$ \
	<p> -&emsp; 若令\\(D_{c,x_i}\\)为\\(D_c\\)中第\\(i\\)个属性上取值为\\(x_i\\)的样本集合，则 </p> \
	$$ P(x_i|c)=\\frac{|D_{c,x_i}|}{|D_c|} $$ \
	<p> -&emsp; 若\\( p(x_i|c)\\sim\\mathcal{N}\\left\( \\mu_{c,i},\\sigma_{c,i}^2 \\right\) \\)，则 </p> \
	$$ P(x_i|c)=\\frac{1}{\\sqrt{2\\pi}\\sigma_{c,i}}\\exp\\left\( -\\frac{\\left\( x_i-\\mu_{c,i} \\right\)^2}{2\\sigma_{c,i}^2} \\right\) $$ \
	<p> 为了使得概率不为\\(0\\)，一般会使用各类别样本个数\\( N=\\sum{N_i} \\)进行平滑 </p> \
	$$ \\begin{align} P(c) &= \\frac{|D_c|+1}{|D|+N} \\\\ \
	P(x_i|c) &= \\frac{|D_{c,x_i}|+1}{|D_c|+N_i} \\end{align} $$ \
	<h3> 半朴素贝叶斯分类器 </h3> \
	<p> 适当考虑一部分属性间的相互依赖信息 </p> \
	$$ P(c|x)\\propto P(c)\\prod_{i=1}^d{P(x_i|c,\\pi_i)} $$ \
	<p> 其中\\(\\pi_i\\)为\\(x_i\\)所依赖的属性集合（父属性） </p> \
	<div style='text-align:center'><img align='middle' width='400px' src='note_files/machine_learning/half_naive_bayes.png'/></div> \
	<ul> \
		<li> 独依赖估计（One-Dependent Estimator, ODE）：每个属性仅依赖其他一个属性 </li> \
		<li> Super-Parent ODE（SPODE）：每个属性都依赖同一个属性 </li> \
		<li> <p> Tree Augmented Naïve Bayes（TAN）：依赖关系为最大权生成树 </p> \
		<ol> \
			<li> 计算两个属性之间的条件互信息 </li> \
			$$ I(x_i,x_j|y)=\\sum_{c\\in C}{P(x_i,x_j|c)\\log{\\frac{P(x_i,x_j|c)}{P(x_i|c)P(x_j|c)}}} $$ \
			<li> 以属性为结点构建完全图，任意两个结点之间边权为\\(I(x_i,x_j|y)\\) </li> \
			<li> 构建完全图的最大权生成树，挑选根变量，将边置为有向 </li> \
		</ol> </li> \
		<li> <p> Average ODE (AODE)：集成学习机制，尝试将每个属性作为超父来构建SPODE </p> \
			$$ P(c|x)\\propto \\sum_{\\begin{matrix} i=1 \\\\ \\left|D_{x_i}\\right|\\ge\\delta \\end{matrix} }{P(c|x_i) \\prod_{j=1}^d{P(x_j|c,x_i)} } $$ \
			<p> 其中\\(D_(x_i)\\)为第\\(i\\)个属性上取值为\\(x_i\\)的集合，\\(\\delta\\)为阈值 </p> \
			$$ \\begin{align} \\hat{P}(c,x_i) &= \\frac{\\left|D_{c,x_i}\\right|+1}{|D|+N_i} \\\\ \\hat{P}{(x_j|c,x_i)} &= \\frac{\\left|D_{c,x_i,x_j}\\right|+1}{\\left|D_{c,x_j}\\right|+N_j} \\end{align} $$ \
		</li> \
	</ul> \
	<h3> 贝叶斯网 </h3> \
	<p> 一个贝叶斯网\\(B\\)由结构\\(G\\)和参数\\(\\Theta\\)构成，即\\(B=\\langle G,\\Theta\\rangle\\)，其中\\(G\\)是一个有向无环图，每个结点对应一个属性，若两个属性间有依赖关系，则它们由一条边连接；参数\\(\\Theta\\)定量描述这种依赖关系，则\\(\\Theta\\)包含了每个属性的条件概率表\\(\\theta_{x_i|\\pi_i}=P_B(x_i|\\pi_i)\\) </p> \
	<p> 贝尔斯网假设每个属性与它的非后裔属性独立，于是 </p> \
	$$ P_B(x_1,x_2,\\cdots,x_d)=\\prod_{i=1}^d{P_B(x_i|\\pi_i)}=\\prod_{i=1}^d{\\theta_{x_i|\\pi_i}} $$ \
	<p> -&emsp; 在同父结构中，给定\\(x_1\\)的取值，\\(x_3\\)和\\(x_4\\)条件独立，记做\\(x_3\\perp x_4|x_1\\) </p> \
	<p> -&emsp; V型结构中，给定\\(x_4\\)取值，\\(x_1\\)和\\(x_2\\)必不独立；但\\(x_4\\)取值未知，\\(x_1\\)和\\(x_2\\)边际独立 </p> \
	<p> -&emsp; 顺序结构中，\\(y\\perp z|x\\) </p> \
	<div style='text-align:center'><img align='middle' width='300px' src='note_files/machine_learning/bayes_network.png'/></div> \
	<ul> \
		<li> <p> 有向分离：将有向图转化为无向图 </p> \
		<p> 找出有向图中的所有V型结构，在V型结构的两个父结点之间连一条无向边 </p> \
		<p> 由此产生的无向图成为“道德图” </p> </li> \
		<li> <p> 学习：给定训练集\\(D=\\\{x_1,x_2,\\cdots,x_m\\\}\\)，贝叶斯网\\(B=\\langle G,\\Theta\\rangle\\)在\\(D\\)上的评价函数为 </p> \
		$$ s(B|D)=f(\\theta)|B|-LL(B|D) $$ \
		<p> 其中\\(|B|\\)是贝叶斯网的参数个数，\\(f(\\theta)\\)描述每个参数θ所需要的字节数，而 </p> \
		$$ LL(B|D)=\\sum_{i=1}^m{\\log{P_B(x_i)}} $$ \
		<p> 是贝叶斯网的对数似然 </p> \
		<p> -&emsp; 若\\(f(\\theta)=1\\)，即每个参数用\\(1\\)字节描述，则得到AIC（Akaike Information Criterion）评分函数 </p> \
		<p> -&emsp; 若\\(f(\\theta)=\\frac{1}{2}\\log{⁡m}\\)，则得到BIC（Bayesian Information Criterion）评分函数</p> \
		<p> -&emsp; 若\\(f(\\theta)=0\\)，则不考虑网络编码长度，退化为极大似然估计 </p> \
		<p> 若网络结构固定，此时等价于对参数极大似然估计 </p> \
		<p> 搜索最优贝叶斯网络是NP难问题，一般使用贪心+调整、限定树状结构求解 </p> </li> \
		<li> <p> 推断：最理想的是直接根据贝叶斯网定义的联合概率分布来精确计算后验概率，但是这是NP难的，一般使用吉布斯采样来近似推断： </p> \
		<ul> \
			<li> 在所有变量的联合状态空间中进行“随机漫步”，每一步依赖于前一步的状态（马尔可夫链） </li> \
			<li> 假设经过\\(T\\)次采样得到与待查询变量\\(q\\)一致的样本数为\\(n_q\\)，则可近似估算出后验概率 </li> \
			<li> 无论从什么初始状态开始，马尔可夫链第\\(t\\)步的状态分布在\\(t\\rightarrow\\infty\\)时必收敛与一个平稳分布 </li> \
		</ul> \
		<table cellpadding='5px' width='100%'> \
			<tr style='border-top:2px solid #000000; border-bottom:1px solid #000000;'> \
			<td> 算法：</td> \
			<td> 贝叶斯网的吉布斯采样 </td> \
			</tr> <tr style='border-bottom:1px solid #000000;'> \
			<td style='vertical-align:top; width:60px;'> 输入： </td> <td> \
				贝叶斯网\\(B=\\langle G,\\Theta\\rangle\\) <br/> \
				采样次数\\(T\\) <br/> \
				证据变量\\(\\bf E\\)及其取值\\(\\pmb e\\) <br/> \
				待查询变量\\(\\bf Q\\)及其取值\\(\\pmb q\\) \
			</td> \
			</tr> <tr style='border-bottom:1px solid #000000;'> <td colspan='2'> \
				\\(n_q=0\\) <br/> \
				\\({\\pmb q}^{(0)}=\\)对\\(\\bf Q\\)随机赋初值 <br/> \
				<code>for </code>\\(t=1,2,\\cdots,T\\)<code> do</code> <br/> \
				<code>&emsp;&emsp;&emsp; for </code>\\(Q_i\\in{\\bf Q}\\)<code> do</code> <br/> \
				<code>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; </code>\\( {\\bf Z}={\\bf E}\\cup{\\bf Q}-\\\{Q_i\\\} \\) <br/> \
				<code>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; </code>\\( {\\pmb z}={\\pmb e}\\cup{\\pmb q}^{(t-1)}-\\\{q_i^{(t-1)}\\\} \\) <br/> \
				<code>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; </code>根据\\(B\\)计算分布\\( P_B(Q_i|{\\bf Z}={\\pmb z}) \\) <br/> \
				<code>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; </code>\\( q_i^{(t)}= \\)根据\\( P_B(Q_i|{\\bf Z}={\\pmb z}) \\)采样所获\\(Q_i\\)取值 <br/> \
				<code>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; </code>\\( {\\pmb q}^{(t)}= \\)将\\( {\\pmb q}^{(t-1)} \\)中的\\(q_i^{(t-1)}\\)用\\(q_i^{(t)}\\)替换 <br/> \
				<code>&emsp;&emsp;&emsp; if </code>\\( {\\pmb q}^{(t)}={\\pmb q} \\)<code> then</code> <br/> \
				<code>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; </code>\\(n_q=n_q+1\\) <br/> \
			</td> </tr> <tr style='border-bottom:1px solid #000000;'> \
			<td> 输出： </td> \
			<td> \\( P({\\bf Q}={\\pmb q}|{\\bf E}={\\pmb e})\\simeq\\frac{n_q}{T} \\) </td> \
			</tr> \
		</table> </li> \
	</ul> \
	<h4> 吉布斯采样（Gibbs Sampling） </h4> \
	<ol> \
		<li> 考虑分布\\( p(x)=p(x_1,x_2,\\cdots,x_M)\\)，吉布斯算法初始化\\( \\left\\\{x_i^{(0)}:i=1,2,\\cdots,M\\right\\\} \\) </li> \
		<li> <p> 对于第\\(\\tau\\)步： </p> \
		<p> 采样\\( x_1^{(\\tau+1)}\\sim p\\left\( x_1 \\left| e,x_2^{(\\tau)},\\cdots,x_M^{(\\tau)} \\right. \\right\) \\) </p> \
		<p> \\(\\cdots\\) </p> \
		<p> 采样\\( x_j^{(\\tau+1)}\\sim p\\left\(x_j \\left| e,x_1^{(\\tau+1)},\\cdots,x_{j-1}^{(\\tau+1)},x_{j+1}^{(\\tau)},\\cdots,x_M^{(\\tau)} \\right. \\right\) \\) </p> \
		<p> \\(\\cdots\\) </p> \
		<p> 采样\\( x_M^{(\\tau+1)}\\sim p\\left\( x_M \\left| e,x_1^{(\\tau+1)},\\cdots,x_{M-1}^{(\\tau+1)} \\right. \\right\) \\) </p> \
	</ol> \
	<h2> 集成算法 </h2> \
	<p> 先产生一组个体学习器，再用某种策略将它们结合起来 </p> \
	<p> 同质集成：个体学习器为同一基学习算法的基学习器 </p> \
	<p> 异质集成：个体学习器为组件学习器，由不同算法生成 </p> \
	<p> 考虑二分类问题\\(y=\\\{-1,+1\\\}\\)和真实函数\\(f\\)，假定基分类器的错误率为\\(\\epsilon\\)，即对每个基分类器\\(h_i\\)有 </p> \
	$$ P(h_i(x)\\neq f(x))=\\epsilon $$ \
	<p> 结合\\(T\\)个基分类器，超过半数基分类器正确则集成分类为正确（少数服从多数） </p> \
	$$ H(x)={\\rm sign}\\left\( \\sum_{i=1}^T{h(x)} \\right\) $$ \
	<p> 假设基分类器的错误率相互独立，则由Hoeffding不等式可知，集成的错误率为 </p> \
	$$ P(H(x)\\neq f(x))=\\sum_{k=0}^{\\lfloor T/2\\rfloor}{{T \\choose k}(1-\\epsilon)^k\\epsilon^{T-k}}\\le\\exp{\\left\(-\\frac{1}{2}T(1-2\\epsilon)^2\\right\)} $$ \
	<p> 随着集成中的个体分类器数目\\(T\\)的增大，集成学习的错误率将指数下降 </p> \
	<h3> Boosting </h3> \
	<p> 先从初始训练集训练出一个基学习器，再根据基学习器的表现对训练样本分布进行调整，使先前基学习器做错的训练样本在后续收到更多关注，然后基于调整后的样本分布来训练下一个基学习器；直到基学习器数目达到事先指定的值\\(T\\)，最终将这\\(T\\)个基学习器进行加权结合 </p> \
	<ul> \
		<li> 算法要求基学习器能对特定的数据分布进行学习，可使用“重赋权法”；对无法接受带权样本的基学习器，可使用“重采样法” </li> \
		<li> Boosting主要降低偏差 </li> \
	</ul> \
	<h4> AdaBoost </h4> \
	<p> 用于二分类任务，基学习器的线性组合 </p> \
	$$ H(x)=\\sum_{i=1}^T{\\alpha_th_t(x)} $$ \
	<p> 来最小化指数损失函数 </p> \
	$$ \\ell_{\\rm exp}(H|D)=\\mathbb{E}_{x\\sim D}\\left[ e^{-f(x)H(x)} \\right] $$ \
	<p> 若对\\(H(x)\\)求偏导为零可得 </p> \
	$$ \\begin{align} \\frac{\\partial\\ell_{\\rm exp}(H|D)}{\\partial H(x)} &= -e^{-H(x)}P(f(x)=1|x)+e^{H(x)}P(f(x)=-1|x) \\\\ \
	H(x) &= \\frac{1}{2}\\ln{\\frac{P(f(x)=1|x)}{P(f(x)=-1|x)}} \\\\ \
	{\\rm sign}(H(x)) &= \\begin{cases} 1 & P(f(x)=1|x)&gt;P(f(x)=-1|x) \\\\ -1 & P(f(x)=1|x)&lt;P(f(x)=-1|x) \\end{cases} \\end{align} $$ \
	<p> 即\\({\\rm sign}⁡(H(x))\\)达到了贝叶斯最优错误率 </p> \
	<table cellpadding='5px' width='100%'> \
		<tr style='border-top:2px solid #000000; border-bottom:1px solid #000000;'> \
		<td> 算法：</td> \
		<td> AdaBoost </td> \
		</tr> <tr style='border-bottom:1px solid #000000;'> \
		<td style='vertical-align:top; width:60px;'> 输入： </td> <td> \
			训练集\\( D=\\\{(x_1,y_1),(x_2,y_2),\\cdots,(x_m,y_m)\\\} \\) <br/> \
			基学习算法\\(\\mathcal{L}\\) <br/> \
			训练轮数\\(T\\) <br/> \
		</td> \
		</tr> <tr style='border-bottom:1px solid #000000;'> <td colspan='2'> \
			\\(D_1(x))=1/m\\) <br/> \
			<code>for </code>\\( t=1,2,\\cdots,T \\)<code> do</code> <br/> \
			<code>&emsp;&emsp;&emsp; </code>\\( h_t=\\mathcal{L}(D,D_t) \\) <br/> \
			<code>&emsp;&emsp;&emsp; </code>\\( \\epsilon_t=P_{x\\sim D_t}(h_t(x)\\neq f(x)) \\) <br/> \
			<code>&emsp;&emsp;&emsp; if </code>\\( \\epsilon_t>0.5 \\)<code> then break</code> <br/> \
			<code>&emsp;&emsp;&emsp; </code>\\( \\alpha_t=\\frac{1}{2}\\ln{\\left\( \\frac{1-\\epsilon_t}{\\epsilon_t} \\right\)} \\) <br/> \
			<code>&emsp;&emsp;&emsp; </code>\\( D_{t+1}(x)=\\frac{D_t(x)}{Z_t}\\times\\begin{cases} \\exp{(-\\alpha_t)} & \\text{if } h_t(x)=f(x) \\\\ \\exp{(\\alpha_t)} & \\text{if } h_t(x)\\neq f(x) \\end{cases} = \\frac{D_t(x)\\exp{(-\\alpha_tf(x)h_t(x))}}{Z_t} \\) <br/> \
		</td> </tr> <tr style='border-bottom:1px solid #000000;'> \
		<td> 输出： </td> \
		<td> \\( H(x)={\\rm sign}\\left\( \\sum_{i=1}^T{\\alpha_th_t(x)} \\right\) \\) </td> \
		</tr> \
	</table> </li> \
	<ul> \
		<li> <p> 第一个基分类器\\(h_1\\)是直接将基学习器用于初始分布获得，此后迭代地生成\\(h_t\\)和\\(\\alpha_t\\)，当基分类器\\(h_t\\)基于分布\\(D_t\\)产生后，该基分类器的权重\\(\\alpha_t\\)应使得\\(\\alpha_th_t\\)最小化指数损失函数 </p> \
		$$ \\begin{align} \\ell_{\\rm exp}(\\alpha_th_t|D_t) &= \\mathbb{E}_{x\\sim D_t}\\left[ e^{-f(x)\\alpha_th_t(x)} \\right] \\\\ \
		&= \\mathbb{E}_{x\\sim D_t}\\left[ e^{-\\alpha_t}\\mathbb{I}(f(x)=h_t(x))+e^{\\alpha_t}\\mathbb{I}(f(x)\\neq h(x)) \\right] \\\\ \
		&= e^{-\\alpha_t}P_{x\\sim D_t}(f(x)=h_t(x))+e^{\\alpha_t}P_{x\\sim D_t}(f(x)\\neq h_t(x)) \\\\ \
		&= e^{-\\alpha_t}(1-\\epsilon_t)+e^{\\alpha_t}\\epsilon_t \\end{align} $$ \
		<p> 考虑指数损失函数的偏导 </p> \
		$$ \\begin{align} \\frac{\\partial\\ell_{\\rm exp}(\\alpha_th_t|D_t)}{\\partial\\alpha_t} &= -e^{-\\alpha_t}(1-\\epsilon_t)+e^{\\alpha_t}\\epsilon_t \\\\ \
		\\alpha_t &= \\frac{1}{2}\\ln{\\left\( \\frac{1-\\epsilon_t}{\\epsilon_t} \\right\)} \\end{align} $$ </li> \
		<li> <p> 在获得\\(H_{t-1}\\)之后样本分布将进行调整，使得下一轮的基学习器\\(h_t\\)能纠正\\(H_{t-1}\\)的一些错误，即最小化 </p> \
		$$ \\begin{align} \\ell_{\\rm exp}(H_{t-1}+h_t|D) &= \\mathbb{E}_{x\\sim D}\\left[ e^{-f(x)(h_{t-1}(x)+h_t(x))} \\right] \\\\ \
		&= \\mathbb{E}_{x\\sim D}\\left[ e^{-f(x)H_{t-1}(x)}e^{-f(x)h_t(x)} \\right] \\end{align} $$ \
		<p> 由于\\(f^2(x)=h_t^2(x)=1\\)，使用泰勒展开近似为 </p> \
		$$ \\begin{align} \\ell_{\\rm exp}(H_{t-1}+h_t|D) &\\simeq \\mathbb{E}_{x\\sim D}\\left[ e^{-f(x)H_{t-1}(x)}\\left\( 1-f(x)h_t(x)+\\frac{f^2(x)h_t^2(x)}{2} \\right\) \\right] \\\\ \
		&= \\mathbb{E}_{x\\sim D}\\left[ e^{-f(x)H_{t-1}(x)}\\left\( \\frac{1}{2} - f(x)h_t(x) \\right\) \\right] \\end{align} $$ \
		<p> 于是，理想的基学习器 </p> \
		$$ \\begin{align} h_t^*(x) &= \\mathop{\\arg\\min}_h{\\ell_{\\rm exp}(H_{t-1}+h|D)} \\\\ \
		&= \\mathop{\\arg\\max}_h{\\mathbb{E}_{x\\sim D}\\left[ e^{-f(x)H_{t-1}(x)}f(x)h(x) \\right]} \\\\ \
		&= \\mathop{\\arg\\max}_h{\\mathbb{E}_{x\\sim D}\\left[ \\frac{e^{-f(x)H_{t-1}(x)}}{\\mathbb{E}_{x\\sim D}\\left[ e^{-f(x)H_{t-1}(x)} \\right]} f(x)h(x) \\right]} \\end{align} $$ \
		<p> 注意到\\( \\mathbb{E}_{x\\sim D}\\left[e^{-f(x)H_{t-1}(x)}\\right] \\)是一个常数，令分布 </p> \
		$$ D_t(x)=\\frac{D(x)e^{-f(x)H_{t-1}(x)}}{\\mathbb{E}_{x\\sim D}\\left[ e^{-f(x)H_{t-1}(x)} \\right]} $$ \
		<p> 则根据数学期望的意义，这等价于令 </p> \
		$$ \\begin{align} h_t(x) &= \\mathop{\\arg\\max}\\mathbb{E}_{x\\sim D_t}[f(x)h(x)] \\\\ \
		&= \\mathop{\\arg\\max}\\mathbb{E}_{x\\sim D_t}[1-2\\mathbb{I}(f(x)\\neq h(x))] \\\\ \
		&= \\mathop{\\arg\\min}\\mathbb{E}_{x\\sim D_t}[\\mathbb{I}(f(x)\\neq h(x))] \\end{align} $$ \
		<p> 由此可见，理想的\\(h_t\\)将在分布\\(D_t\\)下最小化分类误差，弱分类器将基于分布\\(D_t\\)来训练（且针对\\(D_t\\)的分类误差应小于\\(0.5\\)，否则不如随机分类器），残差逼近。考虑\\(D_t\\)和\\(D_{t+1}\\)的关系 </p> \
		$$ \\begin{align} D_{t+1} &= \\frac{D(x)e^{-f(x)H_t(x)}}{\\mathbb{E}_{x\\sim D}\\left[ e^{-f(x)H_t(x)} \\right]} \\\\ \
		&= \\frac{D(x)e^{-f(x)H_{t-1}(x)}e^{-f(x)\\alpha_th_t(x)}}{\\mathbb{E}_{x\\sim D}\\left[ e^{-f(x)H_t(x)} \\right]} \\\\ \
		&= D_t(x)e^{-f(x)\\alpha_th_t(x)}\\frac{\\mathbb{E}_{x\\sim D}\\left[ e^{-f(x)H_{t-1}(x)} \\right]}{\\mathbb{E}_{x\\sim D}\\left[ e^{-f(x)H_t(x)} \\right]} \\end{align} $$ \
		<p> 即算法中更新分布的过程，其中\\(Z_t\\)是规范化因子，以确保\\(D_{t+1}\\)是一个分布 </p> </li> \
	</ul> \
	<h3> Bagging </h3> \
	<p> 采样出\\(T\\)个包含\\(m\\)个样本的采样集（使用自助采样法），基于每个采样集训练出一个基学习器，再通过简单投票法将这些基学习器的结果结合（回归任务使用简单平均法） </p> \
	$$ H(x)=\\mathop{\\arg\\max}_{y\\in\\mathcal{Y}}\\sum_{t=1}^T{\\mathbb{I}(h_t(x)=y)} $$ \
	<p> 由于使用自助采样法，剩下的样本可作为验证集。令\\(D_t\\)表示\\(h_t\\)实际使用的训练集，则令 </p> \
	$$ H^{\\rm oob}(x)=\\mathop{\\arg\\max}_{y\\in\\mathcal{Y}}{\\sum_{t=1}^T{\\mathbb{I}(h_t(x)=y)\\cdot\\mathbb{I}(x\\notin D_t)}} $$ \
	<p> 为对样本\\(x\\)的包外估计（out-of-bag estimate），即考虑那些未使用\\(x\\)训练的基学习器在\\(x\\)上的预测。则Bagging泛化误差的包外估计为 </p> \
	$$ \\epsilon^{\\rm oob}=\\frac{1}{D}\\sum_{(x,y)\\in D}{\\mathbb{I}(H^{\\rm oob}(x)\\neq y)} $$ \
	<ul> \
		<li> 当基学习器是决策树时可以用包外样本来辅助剪枝；是神经网络时可以用来早期停止防止过拟合 </li> \
		<li> Bagging主要关注降低方差 </li> \
	</ul> \
	<h3> 随机森林（Random Forest） </h3> \
	<p> 以决策树为基学习器构建Bagging集成的基础上，进一步在决策树的训练过程中引入随机属性选择 </p> \
	<p> 传统决策树在选择划分属性时，在当前结点的所有d个属性集合中选择一个最优属性；随机森林中，对基决策树的每个结点，先从该结点的属性集合中随机选择一个包含\\(k\\)个属性的子集，然后再从这个子集中选择一个最优属性用于划分 </p> \
	<p> -&emsp; 推荐值：\\(k=\\log_2⁡{d}\\) </p> \
	<p> -&emsp; 泛化性能强；训练效率优于Bagging </p> \
	<h3> 结合策略 </h3> \
	<h4> 平均法 </h4> \
	<ul> \
		<li> <p> 简单平均法 </p> \
		$$ H(x)=\\frac{1}{T}\\sum_{i=1}^T{h_i(x)} $$ </li> \
		<li> <p> 加权平均法 </p> \
		$$ H(x)=\\sum_{i=1}^T{w_ih_i(x)} $$ \
		<p> 通常要求\\( w_i\\ge 0, \\sum_{i=1}^T{w_i}=1 \\) </p> </li> \
	</ul> \
	<h4> 投票法 </h4> \
	<p> 设预测输出为\\(\\|\\mathcal{Y}|\\)维向量，代表类别标记集合的预测结果：\\(h_i=\\left\(h_i^1(x);h_i^2(x);\\cdots;h_i^{|\\mathcal{Y}|}(x)\\right\) \\) </p> \
	<ul> \
		<li> <p> 绝对多数投票法 </p> \
		<p> 只有某标记得票数超过半数才预测为该标记 </p> \
		$$ H(x)=\\begin{cases} c_j & \\text{if } \\sum_{i=1}^T{h_i^j(x)}&gt;\\frac{1}{2}\\sum_{k=1}^{\\mathcal{|Y|}}{\\sum_{i=1}^T{h_i^k(x)}} \\\\ \
		\\text{reject} & \\text{otherwise} \\end{cases} $$ </li> \
		<li> <p> 相对多数投票法 </p> \
		$$ H(x)=c_{\\mathop{\\arg\\max}_j{\\sum_{i=1}^T{h_u^j(x)}}} $$ </li> \
		<li> <p> 加权投票法 </p> \
		$$ H(x)=c_{\\mathop{\\arg\\max}_j{\\sum_{i=1}^T{w_ih_i^j(x)}}} $$ \
		<p> 通常要求\\( w_i\\ge 0, \\sum_{i=1}^T{w_i}=1 \\) </p> </li> \
	</ul> \
	<p> 个体学习器输出值\\(h_i^j(x)\\)的类型： </p> \
	<p> -&emsp; 类标记：\\(h_i^j(x)\\in\\\{0,1\\\}\\)；用于硬投票 </p> \
	<p> -&emsp; 类概率：\\(h_i^j(x)\\in[0,1]\\)，相当于对后验概率\\(P(c_j|x)\\)的一个估计；用于软投票 </p> \
	<p> 不同类型的\\(h_i^j(x)\\)不能混用（例如全部转化为类标记） </p> \
	<h4> 学习法（Stacking） </h4> \
	<p> 通过次级学习器（元学习器）将初级学习器的结果结合 </p> \
	<ol> \
		<li> 从初始数据训练初级学习器 </li> \
		<li> 多个初级学习器的输出被当做样本的输入特征，初始样本的标签仍保留，训练次级学习器 </li> \
	</ol> \
	<ul> \
		<li> 为了防止过拟合，一般使用交叉检验的方法，用初级学习器未使用的样本来训练次级学习器 </li> \
		<li> 初级学习器的输出类概率作为次级学习器的输入，用多响应线性回归（Multi-response Linear Regression, MLR）作为次级学习器，效果较好 </li> \
	</ul> \
	<h3> 多样性 </h3> \
	<h4> 误差-分歧分解 </h4> \
	<p> 定义个体学习器\\(h_i\\)构成的集成\\(H\\)的平方误差分别为 </p> \
	$$ \\begin{align} E(h_i|x) &= (f(x)-h_i(x))^2 \\\\ E(H|x) &= (f(x)-H(x))^2 \\end{align} $$ \
	<p> 则集成的分歧（不一致性）为 </p> \
	$$ A(H|x)=\\sum_{i=1}^T{w_iA(h_i|x)}=\\sum_{i=1}^T{w_i(h_i(x)-H(x))^2}=\\left\( \\sum_{i=1}^T{w_iE(h_i|x)}\\right\)-E(H|x) $$ \
	<p> 上式对所有样本成立，令\\(p(x)\\)表示样本的概率密度，则在全样本上有 </p> \
	$$ \\sum_{i=1}^T{w_i\\int{A(h_i|x)p(x){\\rm d}x}} = \\left\( \\sum_{i=1}^T{w_i\\int{E(h_i|x)p(x){\\rm d}x}} \\right\) - \\int{E(H|x)p(x){\\rm d}x} $$ \
	<p> 个体学习器\\(h_i\\)在全样本上的泛化误差和分歧项分别为 </p> \
	$$ \\begin{align} E_i &= \\int{E(h_i|x)p(x){\\rm d}x} \\\\ \
	A_i &= \\int{A(h_i|x)p(x){\\rm d}x} \\end{align} $$ \
	<p> 集成\(H\\)的泛化误差为 </p> \
	$$ E=\\int{E(H|x)p(x){\\rm d}x} $$ \
	<p> 这说明，个体学习器准确率越高，多样性越大，集成越好 </p> \
	$$ E=\\sum_{i=1}^T{w_iE_i}-\\sum_{i=1}^T{w_iA_i} $$ \
	<h4> 多样性度量 </h4> \
	<p> 对于二分类任务，分类器\\(h_i\\)和\\(h_j\\)的预测结果列联表为（\\(a+b+c+d=m\\)） </p> \
	<table style='text-align:center;' cellpadding='5px'> \
		<tr style='border-top:1px solid #000000;border-bottom:1px solid #000000'> <td style='border-right:1px solid #000000'> </td> <td> \\(h_i=+1\\) </td> <td> \\(h_i=-1\\) </td> </tr> \
		<tr> <td style='border-right:1px solid #000000'> \\(h_j=+1\\) </td> <td> \\(a\\) </td> <td> \\(c\\) </td> </tr> \
		<tr style='border-bottom:1px solid #000000;'> <td style='border-right:1px solid #000000'> \\(h_j=-1\\) </td> <td> \\(b\\) </td> <td> \\(d\\) </td> </tr> \
	</table> \
	<ul> \
		<li> <p> 不合度量 </p> \
		<p> 值域\\([0,1]\\)，值越大多样性越大 </p> \
		$$ {\\rm dis}_{ij}=\\frac{b+c}{m} $$ </li> \
		<li> <p> 相关系数 </p> \
		<p> 值域\\([-1,1]\\)，\\(>0\\)则正相关，\\(<0\\)则负相关，\\(=0\\)则无关 </p> \
		$$ \\rho_{ij}=\\frac{ad-bc}{\\sqrt{(a+b)(a+c)(c+d)(b+d)}} $$ </li> \
		<li> <p> Q-统计量 </p> \
		<p> 与相关系数符号相同，且\\(|Q_{ij}|\\le|\\rho_ij|\\) </p> \
		$$ Q_{ij}=\\frac{ad-bc}{ad+bc} $$ </li> \
		<li> <p> \\(\\kappa\\)-统计量 </p> \
		<p> 若分类器\\(h_i\\)和\\(h_j\\)在数据及上完全一致，则\\(\\kappa=1\\)；若它们仅是偶然达成一致，则\\(\\kappa=0\\) </p> \
		$$ \\begin{align} \\kappa &= \\frac{p_1-p_2}{1-p_2} \\\\ p_1 &= \\frac{a+d}{m} \\\\ p_2 &= \\frac{(a+b)(a+c)+(c+d)(b+d)}{m^2} \\end{align} $$ \
		<p> 其中\\(p_1\\)是两个分类器取得一致的概率，\\(p_2\\)是两个分类器偶然达成一致的概率 </p> </li> \
	</ul> \
	<h4> 多样性增强 </h4> \
	<ul> \
		<li> 数据样本扰动 </li> \
		<li> 算法参数扰动 </li> \
		<li> 输入属性扰动：从初始属性集中取若干属性子集，基于每个属性子集训练一个基学习器 </li> \
		<li> 输出表示扰动：随机改变一些标签；分类化为回归 </li> \
	</ul> \
	<h2> 聚类算法 </h2> \
";
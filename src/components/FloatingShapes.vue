<template>
	<ul class="circles">
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
	</ul>
</template>

<style scoped>
.circles {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 0;
	pointer-events: none;
	overflow: hidden;
}

.circles li {
	position: absolute;
	display: block;
	list-style: none;
	width: 20px;
	height: 20px;
	background: rgba(96, 183, 199, 0.1);
	animation: animate 25s linear infinite;
	bottom: calc(-150px - 40vh);
	border-radius: 50%;
	border-top-left-radius: 0 !important;
}

.circles li:nth-child(1) {
	left: 25%;
	width: 80px;
	height: 80px;
	animation-delay: 0s;
	animation-duration: 20s;
	background: rgba(47, 44, 92, 0.1);
}
.circles li:nth-child(2) {
	left: 10%;
	width: 20px;
	height: 20px;
	animation-delay: 0s;
	animation-duration: 25s;
	background: rgba(96, 183, 199, 0.1);
}
.circles li:nth-child(3) {
	left: 70%;
	width: 20px;
	height: 20px;
	animation-delay: 0s;
	animation-duration: 20s;
	background: rgba(47, 44, 92, 0.1);
}
.circles li:nth-child(4) {
	left: 40%;
	width: 60px;
	height: 60px;
	animation-delay: 0s;
	animation-duration: 15s;
	background: rgba(114, 63, 145, 0.1);
}
.circles li:nth-child(5) {
	left: 65%;
	width: 20px;
	height: 20px;
	animation-delay: 0s;
	animation-duration: 20s;
	background: rgba(96, 183, 199, 0.1);
}
.circles li:nth-child(6) {
	left: 75%;
	width: 90px;
	height: 90px;
	animation-delay: 0s;
	animation-duration: 25s;
	background: rgba(114, 63, 145, 0.1);
}
.circles li:nth-child(7) {
	left: 35%;
	width: 50px;
	height: 50px;
	animation-delay: 0s;
	animation-duration: 30s;
	background: rgba(47, 44, 92, 0.1);
}
.circles li:nth-child(8) {
	left: 50%;
	width: 25px;
	height: 25px;
	animation-delay: 0s;
	animation-duration: 35s;
	background: rgba(114, 63, 145, 0.1);
}
.circles li:nth-child(9) {
	left: 20%;
	width: 15px;
	height: 15px;
	animation-delay: 0s;
	animation-duration: 40s;
	background: rgba(47, 44, 92, 0.1);
}
.circles li:nth-child(10) {
	left: 85%;
	width: 50px;
	height: 50px;
	animation-delay: 0s;
	animation-duration: 45s;
	background: rgba(96, 183, 199, 0.1);
}

@keyframes animate {
	0% {
		transform: translateY(0) rotate(0deg);
		opacity: 0;
	}
	50% {
		transform: translateY(-60vh) rotate(360deg);
		opacity: 1;
	}
	100% {
		transform: translateY(-120vh) rotate(720deg);
		opacity: 0;
	}
}
</style>

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
.circles li:nth-child(11) {
	left: 15%;
	width: 30px;
	height: 30px;
	animation-delay: 0s;
	animation-duration: 50s;
	background: rgba(114, 63, 145, 0.1);
}
.circles li:nth-child(12) {
	left: 90%;
	width: 40px;
	height: 40px;
	animation-delay: 0s;
	animation-duration: 55s;
	background: rgba(47, 44, 92, 0.1);
}
.circles li:nth-child(13) {
	left: 5%;
	width: 60px;
	height: 60px;
	animation-delay: 0s;
	animation-duration: 60s;
	background: rgba(96, 183, 199, 0.1);
}
.circles li:nth-child(14) {
	left: 80%;
	width: 70px;
	height: 70px;
	animation-delay: 0s;
	animation-duration: 65s;
	background: rgba(114, 63, 145, 0.1);
}
.circles li:nth-child(15) {
	left: 30%;
	width: 55px;
	height: 55px;
	animation-delay: 0s;
	animation-duration: 70s;
	background: rgba(47, 44, 92, 0.1);
}
.circles li:nth-child(16) {
	left: 60%;
	width: 45px;
	height: 45px;
	animation-delay: 0s;
	animation-duration: 75s;
	background: rgba(96, 183, 199, 0.1);
}
.circles li:nth-child(17) {
	left: 45%;
	width: 35px;
	height: 35px;
	animation-delay: 0s;
	animation-duration: 80s;
	background: rgba(114, 63, 145, 0.1);
}
.circles li:nth-child(18) {
	left: 55%;
	width: 65px;
	height: 65px;
	animation-delay: 0s;
	animation-duration: 85s;
	background: rgba(47, 44, 92, 0.1);
}
.circles li:nth-child(19) {
	left: 95%;
	width: 75px;
	height: 75px;
	animation-delay: 0s;
	animation-duration: 90s;
	background: rgba(96, 183, 199, 0.1);
}
.circles li:nth-child(20) {
	left: 5%;
	width: 85px;
	height: 85px;
	animation-delay: 0s;
	animation-duration: 95s;
	background: rgba(114, 63, 145, 0.1);
}
.circles li:nth-child(21) {
	left: 25%;
	width: 95px;
	height: 95px;
	animation-delay: 0s;
	animation-duration: 100s;
	background: rgba(47, 44, 92, 0.1);
}
.circles li:nth-child(22) {
	left: 75%;
	width: 100px;
	height: 100px;
	animation-delay: 0s;
	animation-duration: 105s;
	background: rgba(96, 183, 199, 0.1);
}
.circles li:nth-child(23) {
	left: 15%;
	width: 110px;
	height: 110px;
	animation-delay: 0s;
	animation-duration: 110s;
	background: rgba(114, 63, 145, 0.1);
}
.circles li:nth-child(24) {
	left: 85%;
	width: 120px;
	height: 120px;
	animation-delay: 0s;
	animation-duration: 115s;
	background: rgba(47, 44, 92, 0.1);
}
.circles li:nth-child(25) {
	left: 35%;
	width: 130px;
	height: 130px;
	animation-delay: 0s;
	animation-duration: 120s;
	background: rgba(96, 183, 199, 0.1);
}
.circles li:nth-child(26) {
	left: 65%;
	width: 140px;
	height: 140px;
	animation-delay: 0s;
	animation-duration: 125s;
	background: rgba(114, 63, 145, 0.1);
}
.circles li:nth-child(27) {
	left: 45%;
	width: 150px;
	height: 150px;
	animation-delay: 0s;
	animation-duration: 130s;
	background: rgba(47, 44, 92, 0.1);
}
.circles li:nth-child(28) {
	left: 55%;
	width: 160px;
	height: 160px;
	animation-delay: 0s;
	animation-duration: 135s;
	background: rgba(96, 183, 199, 0.1);
}
.circles li:nth-child(29) {
	left: 5%;
	width: 170px;
	height: 170px;
	animation-delay: 0s;
	animation-duration: 140s;
	background: rgba(114, 63, 145, 0.1);
}
.circles li:nth-child(30) {
	left: 95%;
	width: 180px;
	height: 180px;
	animation-delay: 0s;
	animation-duration: 145s;
	background: rgba(47, 44, 92, 0.1);
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

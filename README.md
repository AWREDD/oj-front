# Readme

### for end users

You can visit the OJ site on 

https://oj-front.vercel.app/login

Features on this OJ site:

<img src="./pics/login.png" alt="截屏2023-06-01 17.56.24" style="zoom:30%;" />



**PROBLEM**: Problem Banks, Problem Creating, Problem Reading, Problem Judging

<img src="./pics/problem.png" alt="截屏2023-06-01 17.50.48" style="zoom:30%;" />

**ASSIGNMENT**: Assignment Banks, Assignment Creating, Assignment Reading, Assignment Judging

<img src="./pics/judge.png" alt="截屏2023-06-01 17.59.37" style="zoom:30%;" />

**CONTEST**: Contest Banks, Contest Creating, Contest Taking

<img src="./pics/contest.png" alt="截屏2023-06-01 17.59.05" style="zoom:30%;" />

**CIRCLE**: Discuss Board

<img src="./pics/discussion.png" alt="截屏2023-06-01 18.00.26" style="zoom:50%;" />

**CHECK**: For teacher to check the assignment

<img src="./pics/check.png" alt="截屏2023-06-01 18.00.26" style="zoom:50%;" />

**SUBMISSION**: All submission record

## for developers

To start the project on your local side:

```
git clone https://github.com/AWREDD/oj-front.git
npm install -g pnpm
pnpm install
umi start
```

The project strcuture:

```
-src
	-assets
	-components
	-layouts
	-models
	-pages
		-assigment
		-check
		-circle
		-contest
		-history
		-login
		404.tsx
		index.tsx
```

We use Umi.js, react, typescript, ant desgin to build this site. You can refer umi.js https://umijs.org/docs/introduce/introduce to quickly learn the structure of this project and it is very easy to hand on.

The Router is conventional routing, so you don't need to add route config. And any illegal url can automatically jump to 404.tsx.


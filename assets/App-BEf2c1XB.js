import{r as M,j as n,S as Y}from"./index-GFUcRS3m.js";import{g as j,a as F,c as z,b as Z,S as K,N as J,d as $,L as k}from"./LandingMovie-BtujyN_u.js";import Q from"./ModalProps-Bhbvjvc6.js";import{a as W}from"./axios-CCb-kr4I.js";function q(l){let{swiper:e,extendParams:r,on:d,emit:t,params:o}=l;e.autoplay={running:!1,paused:!1,timeLeft:0},r({autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!1,stopOnLastSlide:!1,reverseDirection:!1,pauseOnMouseEnter:!1}});let u,m,_=o&&o.autoplay?o.autoplay.delay:3e3,a=o&&o.autoplay?o.autoplay.delay:3e3,s,c=new Date().getTime(),I,S,N,G,D,h,v;function T(i){!e||e.destroyed||!e.wrapperEl||i.target===e.wrapperEl&&(e.wrapperEl.removeEventListener("transitionend",T),!(v||i.detail&&i.detail.bySwiperTouchMove)&&f())}const y=()=>{if(e.destroyed||!e.autoplay.running)return;e.autoplay.paused?I=!0:I&&(a=s,I=!1);const i=e.autoplay.paused?s:c+a-new Date().getTime();e.autoplay.timeLeft=i,t("autoplayTimeLeft",i,i/_),m=requestAnimationFrame(()=>{y()})},B=()=>{let i;return e.virtual&&e.params.virtual.enabled?i=e.slides.filter(E=>E.classList.contains("swiper-slide-active"))[0]:i=e.slides[e.activeIndex],i?parseInt(i.getAttribute("data-swiper-autoplay"),10):void 0},A=i=>{if(e.destroyed||!e.autoplay.running)return;cancelAnimationFrame(m),y();let g=typeof i>"u"?e.params.autoplay.delay:i;_=e.params.autoplay.delay,a=e.params.autoplay.delay;const E=B();!Number.isNaN(E)&&E>0&&typeof i>"u"&&(g=E,_=E,a=E),s=g;const U=e.params.speed,V=()=>{!e||e.destroyed||(e.params.autoplay.reverseDirection?!e.isBeginning||e.params.loop||e.params.rewind?(e.slidePrev(U,!0,!0),t("autoplay")):e.params.autoplay.stopOnLastSlide||(e.slideTo(e.slides.length-1,U,!0,!0),t("autoplay")):!e.isEnd||e.params.loop||e.params.rewind?(e.slideNext(U,!0,!0),t("autoplay")):e.params.autoplay.stopOnLastSlide||(e.slideTo(0,U,!0,!0),t("autoplay")),e.params.cssMode&&(c=new Date().getTime(),requestAnimationFrame(()=>{A()})))};return g>0?(clearTimeout(u),u=setTimeout(()=>{V()},g)):requestAnimationFrame(()=>{V()}),g},p=()=>{c=new Date().getTime(),e.autoplay.running=!0,A(),t("autoplayStart")},O=()=>{e.autoplay.running=!1,clearTimeout(u),cancelAnimationFrame(m),t("autoplayStop")},R=(i,g)=>{if(e.destroyed||!e.autoplay.running)return;clearTimeout(u),i||(h=!0);const E=()=>{t("autoplayPause"),e.params.autoplay.waitForTransition?e.wrapperEl.addEventListener("transitionend",T):f()};if(e.autoplay.paused=!0,g){D&&(s=e.params.autoplay.delay),D=!1,E();return}s=(s||e.params.autoplay.delay)-(new Date().getTime()-c),!(e.isEnd&&s<0&&!e.params.loop)&&(s<0&&(s=0),E())},f=()=>{e.isEnd&&s<0&&!e.params.loop||e.destroyed||!e.autoplay.running||(c=new Date().getTime(),h?(h=!1,A(s)):A(),e.autoplay.paused=!1,t("autoplayResume"))},b=()=>{if(e.destroyed||!e.autoplay.running)return;const i=j();i.visibilityState==="hidden"&&(h=!0,R(!0)),i.visibilityState==="visible"&&f()},P=i=>{i.pointerType==="mouse"&&(h=!0,v=!0,!(e.animating||e.autoplay.paused)&&R(!0))},C=i=>{i.pointerType==="mouse"&&(v=!1,e.autoplay.paused&&f())},H=()=>{e.params.autoplay.pauseOnMouseEnter&&(e.el.addEventListener("pointerenter",P),e.el.addEventListener("pointerleave",C))},L=()=>{e.el&&typeof e.el!="string"&&(e.el.removeEventListener("pointerenter",P),e.el.removeEventListener("pointerleave",C))},x=()=>{j().addEventListener("visibilitychange",b)},w=()=>{j().removeEventListener("visibilitychange",b)};d("init",()=>{e.params.autoplay.enabled&&(H(),x(),p())}),d("destroy",()=>{L(),w(),e.autoplay.running&&O()}),d("_freeModeStaticRelease",()=>{(N||h)&&f()}),d("_freeModeNoMomentumRelease",()=>{e.params.autoplay.disableOnInteraction?O():R(!0,!0)}),d("beforeTransitionStart",(i,g,E)=>{e.destroyed||!e.autoplay.running||(E||!e.params.autoplay.disableOnInteraction?R(!0,!0):O())}),d("sliderFirstMove",()=>{if(!(e.destroyed||!e.autoplay.running)){if(e.params.autoplay.disableOnInteraction){O();return}S=!0,N=!1,h=!1,G=setTimeout(()=>{h=!0,N=!0,R(!0)},200)}}),d("touchEnd",()=>{if(!(e.destroyed||!e.autoplay.running||!S)){if(clearTimeout(G),clearTimeout(u),e.params.autoplay.disableOnInteraction){N=!1,S=!1;return}N&&e.params.cssMode&&f(),N=!1,S=!1}}),d("slideChange",()=>{e.destroyed||!e.autoplay.running||(D=!0)}),Object.assign(e.autoplay,{start:p,stop:O,pause:R,resume:f})}function ee(l){const{effect:e,swiper:r,on:d,setTranslate:t,setTransition:o,overwriteParams:u,perspective:m,recreateShadows:_,getEffectParams:a}=l;d("beforeInit",()=>{if(r.params.effect!==e)return;r.classNames.push(`${r.params.containerModifierClass}${e}`),m&&m()&&r.classNames.push(`${r.params.containerModifierClass}3d`);const c=u?u():{};Object.assign(r.params,c),Object.assign(r.originalParams,c)}),d("setTranslate",()=>{r.params.effect===e&&t()}),d("setTransition",(c,I)=>{r.params.effect===e&&o(I)}),d("transitionEnd",()=>{if(r.params.effect===e&&_){if(!a||!a().slideShadows)return;r.slides.forEach(c=>{c.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(I=>I.remove())}),_()}});let s;d("virtualUpdate",()=>{r.params.effect===e&&(r.slides.length||(s=!0),requestAnimationFrame(()=>{s&&r.slides&&r.slides.length&&(t(),s=!1)}))})}function ne(l,e){const r=F(e);return r!==e&&(r.style.backfaceVisibility="hidden",r.style["-webkit-backface-visibility"]="hidden"),r}function X(l,e,r){const d=`swiper-slide-shadow${r?`-${r}`:""}${` swiper-slide-shadow-${l}`}`,t=F(e);let o=t.querySelector(`.${d.split(" ").join(".")}`);return o||(o=z("div",d.split(" ")),t.append(o)),o}function te(l){let{swiper:e,extendParams:r,on:d}=l;r({coverflowEffect:{rotate:50,stretch:0,depth:100,scale:1,modifier:1,slideShadows:!0}}),ee({effect:"coverflow",swiper:e,on:d,setTranslate:()=>{const{width:u,height:m,slides:_,slidesSizesGrid:a}=e,s=e.params.coverflowEffect,c=e.isHorizontal(),I=e.translate,S=c?-I+u/2:-I+m/2,N=c?s.rotate:-s.rotate,G=s.depth,D=Z(e);for(let h=0,v=_.length;h<v;h+=1){const T=_[h],y=a[h],B=T.swiperSlideOffset,A=(S-B-y/2)/y,p=typeof s.modifier=="function"?s.modifier(A):A*s.modifier;let O=c?N*p:0,R=c?0:N*p,f=-G*Math.abs(p),b=s.stretch;typeof b=="string"&&b.indexOf("%")!==-1&&(b=parseFloat(s.stretch)/100*y);let P=c?0:b*p,C=c?b*p:0,H=1-(1-s.scale)*Math.abs(p);Math.abs(C)<.001&&(C=0),Math.abs(P)<.001&&(P=0),Math.abs(f)<.001&&(f=0),Math.abs(O)<.001&&(O=0),Math.abs(R)<.001&&(R=0),Math.abs(H)<.001&&(H=0);const L=`translate3d(${C}px,${P}px,${f}px)  rotateX(${D(R)}deg) rotateY(${D(O)}deg) scale(${H})`,x=ne(s,T);if(x.style.transform=L,T.style.zIndex=-Math.abs(Math.round(p))+1,s.slideShadows){let w=c?T.querySelector(".swiper-slide-shadow-left"):T.querySelector(".swiper-slide-shadow-top"),i=c?T.querySelector(".swiper-slide-shadow-right"):T.querySelector(".swiper-slide-shadow-bottom");w||(w=X("coverflow",T,c?"left":"top")),i||(i=X("coverflow",T,c?"right":"bottom")),w&&(w.style.opacity=p>0?p:0),i&&(i.style.opacity=-p>0?-p:0)}}},setTransition:u=>{e.slides.map(_=>F(_)).forEach(_=>{_.style.transitionDuration=`${u}ms`,_.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(a=>{a.style.transitionDuration=`${u}ms`})})},perspective:()=>!0,overwriteParams:()=>({watchSlidesProgress:!0})})}function re({movie:l}){const[e,r]=M.useReducer((t,o)=>({...t,...o}),{modalState:!1,trailerData:null,viewMoreCate:!1,viewMoreCateIndex:null});function d(t){const o=Math.floor(t/60),u=t%60;return o?`${o}h ${u}p`:`${u}p`}return n.jsxs("div",{className:"heroBanner",children:[l&&l.length>0?n.jsx(K,{effect:"coverflow",grabCursor:!0,autoplay:{delay:3e3,disableOnInteraction:!0,pauseOnMouseEnter:!0},loop:!0,navigation:!0,centeredSlides:!0,slidesPerView:"auto",coverflowEffect:{rotate:0,stretch:0,depth:50,modifier:1,slideShadows:!0},modules:[te,J,q],className:"swiperHeroBanner",children:l.map((t,o)=>n.jsxs($,{children:[n.jsx("div",{className:"imgSwiper",children:n.jsx("img",{loading:"lazy",alt:t.title,src:t.banner.horizontal})}),n.jsxs("div",{className:"in4Swiper",children:[n.jsx("h1",{children:t.movieSeason&&t.movieSeason!==""?`${t.title} (Phần ${t.movieSeason})`:t.title}),n.jsxs("div",{className:"categoryIn4",children:[t.category.slice(0,e.viewMoreCate&&e.viewMoreCateIndex===o?t.category.length:5).map((u,m)=>n.jsx("a",{href:`/ChillPhim/List/Genres/${u}/${u}/NF`,className:"mainCategory",children:u},m)),t.category.length>5?n.jsx("span",{onClick:()=>r({viewMoreCate:!e.viewMoreCate,viewMoreCateIndex:e.viewMoreCateIndex?null:o}),className:"plusCategoryIn4",children:e.viewMoreCate&&e.viewMoreCateIndex===o?"Thu gọn":`+ ${t.category.length-5}`}):null]}),n.jsxs("div",{className:"ratingIn4",children:[n.jsxs("div",{className:"ratingChild",children:[n.jsx("div",{className:"brandRate brandImdb",children:"IMDb"}),n.jsxs("div",{style:{letterSpacing:1},className:"rateScore",children:[t.imdbScore,n.jsx("span",{style:{color:"gray"},children:"/10"})]})]}),n.jsxs("div",{className:"ratingChild",children:[n.jsx("div",{className:"brandRate brandAge",children:t.ageRate}),n.jsx("div",{className:"rateScore",children:t.ageRate==="G"?"(Mọi lứa tuổi)":t.ageRate==="PG"?"(Cân nhắc cho trẻ nhỏ)":t.ageRate==="PG-13"?"(13+)":t.ageRate==="R"?"(18+)":"(XXX)"})]}),n.jsxs("div",{className:"ratingChild",children:[n.jsx("div",{className:"brandRate brandTime",children:"⌛"}),n.jsx("div",{className:"rateScore",children:d(t.time)})]})]}),n.jsx("div",{className:"contentIn4",children:t.content}),n.jsxs("div",{className:"buttonIn4",children:[n.jsxs("a",{href:`/ChillPhim/Streaming/${t.subtitle}/${t.filmSources[0].title}`,className:"playButton",children:["Xem ngay ",n.jsx("span",{style:{marginLeft:10},children:"▶"})]}),n.jsx("button",{type:"button",onClick:()=>r({modalState:!0,trailerData:t.trailerSource}),className:"trailerButton",children:"Xem trailer"})]})]})]},t._id))}):n.jsx(Y,{containerClassName:"swiperHeroBanner",height:"100%"}),n.jsx(Q,{state:e,setState:r,children:n.jsx("iframe",{style:{marginTop:25},allowFullScreen:!0,src:e.trailerData})})]})}var ae={GITHUB_STATE:"/home/runner/work/_temp/_runner_file_commands/save_state_3ee8e472-9603-4bd9-a2d7-f3a0860910de",STATS_TRP:"true",DEPLOYMENT_BASEPATH:"/opt/runner",DOTNET_NOLOGO:"1",USER:"runner",npm_config_user_agent:"npm/10.7.0 node/v18.20.4 linux x64 workspaces/false ci/github-actions",CI:"true",RUNNER_ENVIRONMENT:"github-hosted",GITHUB_ENV:"/home/runner/work/_temp/_runner_file_commands/set_env_3ee8e472-9603-4bd9-a2d7-f3a0860910de",PIPX_HOME:"/opt/pipx",npm_node_execpath:"/usr/local/bin/node",JAVA_HOME_8_X64:"/usr/lib/jvm/temurin-8-jdk-amd64",SHLVL:"1",npm_config_noproxy:"",HOME:"/home/runner",RUNNER_TEMP:"/home/runner/work/_temp",GITHUB_EVENT_PATH:"/home/runner/work/_temp/_github_workflow/event.json",npm_package_json:"/home/runner/work/ChillPhim/ChillPhim/package.json",JAVA_HOME_11_X64:"/usr/lib/jvm/temurin-11-jdk-amd64",PIPX_BIN_DIR:"/opt/pipx_bin",GITHUB_REPOSITORY_OWNER:"Duy14102",GRADLE_HOME:"/usr/share/gradle-8.10.2",ANDROID_NDK_LATEST_HOME:"/usr/local/lib/android/sdk/ndk/27.1.12297006",JAVA_HOME_21_X64:"/usr/lib/jvm/temurin-21-jdk-amd64",STATS_RDCL:"true",GITHUB_RETENTION_DAYS:"90",GITHUB_REPOSITORY_OWNER_ID:"90895096",POWERSHELL_DISTRIBUTION_CHANNEL:"GitHub-Actions-ubuntu22",AZURE_EXTENSION_DIR:"/opt/az/azcliextensions",GITHUB_HEAD_REF:"",npm_config_userconfig:"/home/runner/.npmrc",npm_config_local_prefix:"/home/runner/work/ChillPhim/ChillPhim",SYSTEMD_EXEC_PID:"607",REACT_APP_THEMOVIEDBAPIKEY:"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODUwOTdiMzEwM2NiYWQxNjUxYjRhMDk3MzY3ZTIwYiIsIm5iZiI6MTcyODM4NDE4My4xMDI1NzgsInN1YiI6IjY3MDUwYmZkNWFlMDFkMDkwZTFkNDZkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lKZ_DBIwf0DRhLwmiC1g1lJvhBrR11TMqxZWGbOCZro",GITHUB_GRAPHQL_URL:"https://api.github.com/graphql",COLOR:"0",NVM_DIR:"/home/runner/.nvm",DOTNET_SKIP_FIRST_TIME_EXPERIENCE:"1",GOROOT_1_21_X64:"/opt/hostedtoolcache/go/1.21.13/x64",JAVA_HOME_17_X64:"/usr/lib/jvm/temurin-17-jdk-amd64",ImageVersion:"20241015.1.0",RUNNER_OS:"Linux",GITHUB_API_URL:"https://api.github.com",GOROOT_1_22_X64:"/opt/hostedtoolcache/go/1.22.8/x64",SWIFT_PATH:"/usr/share/swift/usr/bin",RUNNER_USER:"runner",STATS_V3PS:"true",CHROMEWEBDRIVER:"/usr/local/share/chromedriver-linux64",GOROOT_1_23_X64:"/opt/hostedtoolcache/go/1.23.2/x64",JOURNAL_STREAM:"8:17337",GITHUB_WORKFLOW:"Deploy",_:"/usr/local/bin/npm",npm_config_prefix:"/usr/local",npm_config_npm_version:"10.7.0",npm_config_cache:"/home/runner/.npm",ACTIONS_RUNNER_ACTION_ARCHIVE_CACHE:"/opt/actionarchivecache",STATS_D:"true",GITHUB_RUN_ID:"11427406055",STATS_VMFE:"true",GITHUB_REF_TYPE:"branch",BOOTSTRAP_HASKELL_NONINTERACTIVE:"1",GITHUB_WORKFLOW_SHA:"b044e063e8d6dc135c9ab6c2af7e445304dade4e",GITHUB_BASE_REF:"",ImageOS:"ubuntu22",STATS_BLT:"true",GITHUB_WORKFLOW_REF:"Duy14102/ChillPhim/.github/workflows/deploy.yml@refs/heads/main",PERFLOG_LOCATION_SETTING:"RUNNER_PERFLOG",GITHUB_ACTION_REPOSITORY:"",npm_config_node_gyp:"/usr/local/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js",PATH:"/home/runner/work/ChillPhim/ChillPhim/node_modules/.bin:/home/runner/work/ChillPhim/node_modules/.bin:/home/runner/work/node_modules/.bin:/home/runner/node_modules/.bin:/home/node_modules/.bin:/node_modules/.bin:/usr/local/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/snap/bin:/home/runner/.local/bin:/opt/pipx_bin:/home/runner/.cargo/bin:/home/runner/.config/composer/vendor/bin:/usr/local/.ghcup/bin:/home/runner/.dotnet/tools:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin",ANT_HOME:"/usr/share/ant",DOTNET_MULTILEVEL_LOOKUP:"0",RUNNER_TRACKING_ID:"github_a5c77d1e-9fd6-4899-8f0e-55063eb55bb9",INVOCATION_ID:"77870899342641c880bf40aa085b5f9d",RUNNER_TOOL_CACHE:"/opt/hostedtoolcache",NODE:"/usr/local/bin/node",npm_package_name:"chillphim",GITHUB_ACTION:"__run",GITHUB_RUN_NUMBER:"9",GITHUB_TRIGGERING_ACTOR:"Duy14102",RUNNER_ARCH:"X64",XDG_RUNTIME_DIR:"/run/user/1001",AGENT_TOOLSDIRECTORY:"/opt/hostedtoolcache",LANG:"C.UTF-8",VCPKG_INSTALLATION_ROOT:"/usr/local/share/vcpkg",CONDA:"/usr/share/miniconda",RUNNER_NAME:"GitHub Actions 1",XDG_CONFIG_HOME:"/home/runner/.config",STATS_VMD:"true",GITHUB_REF_NAME:"main",GITHUB_REPOSITORY:"Duy14102/ChillPhim",STATS_D_D:"true",npm_lifecycle_script:"vite build",STATS_UE:"true",ANDROID_NDK_ROOT:"/usr/local/lib/android/sdk/ndk/27.1.12297006",GITHUB_ACTION_REF:"",DEBIAN_FRONTEND:"noninteractive",GITHUB_REPOSITORY_ID:"868080583",GITHUB_ACTIONS:"true",npm_package_version:"0.0.0",npm_lifecycle_event:"build",GITHUB_REF_PROTECTED:"false",GITHUB_WORKSPACE:"/home/runner/work/ChillPhim/ChillPhim",ACCEPT_EULA:"Y",GITHUB_JOB:"build",RUNNER_PERFLOG:"/home/runner/perflog",GITHUB_SHA:"b044e063e8d6dc135c9ab6c2af7e445304dade4e",GITHUB_RUN_ATTEMPT:"1",GITHUB_REF:"refs/heads/main",GITHUB_ACTOR:"Duy14102",ANDROID_SDK_ROOT:"/usr/local/lib/android/sdk",REACT_APP_BACKENDAPI:"https://chillphim.onrender.com",LEIN_HOME:"/usr/local/lib/lein",npm_config_globalconfig:"/usr/local/etc/npmrc",npm_config_init_module:"/home/runner/.npm-init.js",GITHUB_PATH:"/home/runner/work/_temp/_runner_file_commands/add_path_3ee8e472-9603-4bd9-a2d7-f3a0860910de",JAVA_HOME:"/usr/lib/jvm/temurin-11-jdk-amd64",PWD:"/home/runner/work/ChillPhim/ChillPhim",GITHUB_ACTOR_ID:"90895096",RUNNER_WORKSPACE:"/home/runner/work/ChillPhim",npm_execpath:"/usr/local/lib/node_modules/npm/bin/npm-cli.js",HOMEBREW_CLEANUP_PERIODIC_FULL_DAYS:"3650",GITHUB_EVENT_NAME:"push",HOMEBREW_NO_AUTO_UPDATE:"1",ANDROID_HOME:"/usr/local/lib/android/sdk",GITHUB_SERVER_URL:"https://github.com",GECKOWEBDRIVER:"/usr/local/share/gecko_driver",LEIN_JAR:"/usr/local/lib/lein/self-installs/leiningen-2.11.2-standalone.jar",GHCUP_INSTALL_BASE_PREFIX:"/usr/local",GITHUB_OUTPUT:"/home/runner/work/_temp/_runner_file_commands/set_output_3ee8e472-9603-4bd9-a2d7-f3a0860910de",npm_config_global_prefix:"/usr/local",EDGEWEBDRIVER:"/usr/local/share/edge_driver",STATS_EXT:"true",npm_command:"run-script",ANDROID_NDK:"/usr/local/lib/android/sdk/ndk/27.1.12297006",SGX_AESM_ADDR:"1",CHROME_BIN:"/usr/bin/google-chrome",SELENIUM_JAR_PATH:"/usr/share/java/selenium-server.jar",STATS_EXTP:"https://provjobdsettingscdn.blob.core.windows.net/settings/provjobdsettings-latest/provjobd.data",ANDROID_NDK_HOME:"/usr/local/lib/android/sdk/ndk/27.1.12297006",GITHUB_STEP_SUMMARY:"/home/runner/work/_temp/_runner_file_commands/step_summary_3ee8e472-9603-4bd9-a2d7-f3a0860910de",INIT_CWD:"/home/runner/work/ChillPhim/ChillPhim",EDITOR:"vi",NODE_ENV:"production"};function ie({Title:l,MarginTop:e,useState:r,useEffect:d,axios:t}){const[o,u]=r(),m=JSON.parse(localStorage.getItem("MovieStorage"));return d(()=>{const _={method:"get",url:`${ae.REACT_APP_BACKENDAPI}/api/v1/getMoviesSeen`,params:{movies:m}};t(_).then(a=>{u(a.data)})},[]),n.jsxs("div",{style:{marginTop:e},className:"landingMovieChild",children:[n.jsx("div",{className:"landingMovieChildTop",children:n.jsx("p",{className:"landingMovieChildTitle",children:l})}),m&&m.length>0&&o?n.jsx(K,{navigation:!0,breakpoints:{0:{slidesPerView:2},700:{slidesPerView:3},991:{slidesPerView:4},1550:{slidesPerView:5}},spaceBetween:15,modules:[J],className:"swiperLandingMovie",children:m.sort((_,a)=>a.time-_.time).map(_=>{const a=o==null?void 0:o.filter(s=>s.subtitle===_.title)[0];return n.jsxs($,{children:[n.jsxs("a",{href:`/ChillPhim/Streaming/${_.title}/${_.eps}`,children:[n.jsx("div",{style:{height:200},className:"imgSwiper",children:n.jsx("img",{loading:"lazy",alt:_.title,src:a==null?void 0:a.banner.horizontal})}),n.jsx("p",{className:"titleSwiper",children:n.jsx("span",{children:a!=null&&a.movieSeason&&(a==null?void 0:a.movieSeason)!==""?`${a==null?void 0:a.title} (Phần ${a==null?void 0:a.movieSeason})`:a==null?void 0:a.title})}),n.jsx("span",{className:"playButtonSwiper",children:"▶"})]}),n.jsx("div",{className:"filmTotal",children:_.eps})]},_.title)})}):n.jsx(Y,{containerClassName:"swiperLandingMovie"})]})}var se={GITHUB_STATE:"/home/runner/work/_temp/_runner_file_commands/save_state_3ee8e472-9603-4bd9-a2d7-f3a0860910de",STATS_TRP:"true",DEPLOYMENT_BASEPATH:"/opt/runner",DOTNET_NOLOGO:"1",USER:"runner",npm_config_user_agent:"npm/10.7.0 node/v18.20.4 linux x64 workspaces/false ci/github-actions",CI:"true",RUNNER_ENVIRONMENT:"github-hosted",GITHUB_ENV:"/home/runner/work/_temp/_runner_file_commands/set_env_3ee8e472-9603-4bd9-a2d7-f3a0860910de",PIPX_HOME:"/opt/pipx",npm_node_execpath:"/usr/local/bin/node",JAVA_HOME_8_X64:"/usr/lib/jvm/temurin-8-jdk-amd64",SHLVL:"1",npm_config_noproxy:"",HOME:"/home/runner",RUNNER_TEMP:"/home/runner/work/_temp",GITHUB_EVENT_PATH:"/home/runner/work/_temp/_github_workflow/event.json",npm_package_json:"/home/runner/work/ChillPhim/ChillPhim/package.json",JAVA_HOME_11_X64:"/usr/lib/jvm/temurin-11-jdk-amd64",PIPX_BIN_DIR:"/opt/pipx_bin",GITHUB_REPOSITORY_OWNER:"Duy14102",GRADLE_HOME:"/usr/share/gradle-8.10.2",ANDROID_NDK_LATEST_HOME:"/usr/local/lib/android/sdk/ndk/27.1.12297006",JAVA_HOME_21_X64:"/usr/lib/jvm/temurin-21-jdk-amd64",STATS_RDCL:"true",GITHUB_RETENTION_DAYS:"90",GITHUB_REPOSITORY_OWNER_ID:"90895096",POWERSHELL_DISTRIBUTION_CHANNEL:"GitHub-Actions-ubuntu22",AZURE_EXTENSION_DIR:"/opt/az/azcliextensions",GITHUB_HEAD_REF:"",npm_config_userconfig:"/home/runner/.npmrc",npm_config_local_prefix:"/home/runner/work/ChillPhim/ChillPhim",SYSTEMD_EXEC_PID:"607",REACT_APP_THEMOVIEDBAPIKEY:"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODUwOTdiMzEwM2NiYWQxNjUxYjRhMDk3MzY3ZTIwYiIsIm5iZiI6MTcyODM4NDE4My4xMDI1NzgsInN1YiI6IjY3MDUwYmZkNWFlMDFkMDkwZTFkNDZkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lKZ_DBIwf0DRhLwmiC1g1lJvhBrR11TMqxZWGbOCZro",GITHUB_GRAPHQL_URL:"https://api.github.com/graphql",COLOR:"0",NVM_DIR:"/home/runner/.nvm",DOTNET_SKIP_FIRST_TIME_EXPERIENCE:"1",GOROOT_1_21_X64:"/opt/hostedtoolcache/go/1.21.13/x64",JAVA_HOME_17_X64:"/usr/lib/jvm/temurin-17-jdk-amd64",ImageVersion:"20241015.1.0",RUNNER_OS:"Linux",GITHUB_API_URL:"https://api.github.com",GOROOT_1_22_X64:"/opt/hostedtoolcache/go/1.22.8/x64",SWIFT_PATH:"/usr/share/swift/usr/bin",RUNNER_USER:"runner",STATS_V3PS:"true",CHROMEWEBDRIVER:"/usr/local/share/chromedriver-linux64",GOROOT_1_23_X64:"/opt/hostedtoolcache/go/1.23.2/x64",JOURNAL_STREAM:"8:17337",GITHUB_WORKFLOW:"Deploy",_:"/usr/local/bin/npm",npm_config_prefix:"/usr/local",npm_config_npm_version:"10.7.0",npm_config_cache:"/home/runner/.npm",ACTIONS_RUNNER_ACTION_ARCHIVE_CACHE:"/opt/actionarchivecache",STATS_D:"true",GITHUB_RUN_ID:"11427406055",STATS_VMFE:"true",GITHUB_REF_TYPE:"branch",BOOTSTRAP_HASKELL_NONINTERACTIVE:"1",GITHUB_WORKFLOW_SHA:"b044e063e8d6dc135c9ab6c2af7e445304dade4e",GITHUB_BASE_REF:"",ImageOS:"ubuntu22",STATS_BLT:"true",GITHUB_WORKFLOW_REF:"Duy14102/ChillPhim/.github/workflows/deploy.yml@refs/heads/main",PERFLOG_LOCATION_SETTING:"RUNNER_PERFLOG",GITHUB_ACTION_REPOSITORY:"",npm_config_node_gyp:"/usr/local/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js",PATH:"/home/runner/work/ChillPhim/ChillPhim/node_modules/.bin:/home/runner/work/ChillPhim/node_modules/.bin:/home/runner/work/node_modules/.bin:/home/runner/node_modules/.bin:/home/node_modules/.bin:/node_modules/.bin:/usr/local/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/snap/bin:/home/runner/.local/bin:/opt/pipx_bin:/home/runner/.cargo/bin:/home/runner/.config/composer/vendor/bin:/usr/local/.ghcup/bin:/home/runner/.dotnet/tools:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin",ANT_HOME:"/usr/share/ant",DOTNET_MULTILEVEL_LOOKUP:"0",RUNNER_TRACKING_ID:"github_a5c77d1e-9fd6-4899-8f0e-55063eb55bb9",INVOCATION_ID:"77870899342641c880bf40aa085b5f9d",RUNNER_TOOL_CACHE:"/opt/hostedtoolcache",NODE:"/usr/local/bin/node",npm_package_name:"chillphim",GITHUB_ACTION:"__run",GITHUB_RUN_NUMBER:"9",GITHUB_TRIGGERING_ACTOR:"Duy14102",RUNNER_ARCH:"X64",XDG_RUNTIME_DIR:"/run/user/1001",AGENT_TOOLSDIRECTORY:"/opt/hostedtoolcache",LANG:"C.UTF-8",VCPKG_INSTALLATION_ROOT:"/usr/local/share/vcpkg",CONDA:"/usr/share/miniconda",RUNNER_NAME:"GitHub Actions 1",XDG_CONFIG_HOME:"/home/runner/.config",STATS_VMD:"true",GITHUB_REF_NAME:"main",GITHUB_REPOSITORY:"Duy14102/ChillPhim",STATS_D_D:"true",npm_lifecycle_script:"vite build",STATS_UE:"true",ANDROID_NDK_ROOT:"/usr/local/lib/android/sdk/ndk/27.1.12297006",GITHUB_ACTION_REF:"",DEBIAN_FRONTEND:"noninteractive",GITHUB_REPOSITORY_ID:"868080583",GITHUB_ACTIONS:"true",npm_package_version:"0.0.0",npm_lifecycle_event:"build",GITHUB_REF_PROTECTED:"false",GITHUB_WORKSPACE:"/home/runner/work/ChillPhim/ChillPhim",ACCEPT_EULA:"Y",GITHUB_JOB:"build",RUNNER_PERFLOG:"/home/runner/perflog",GITHUB_SHA:"b044e063e8d6dc135c9ab6c2af7e445304dade4e",GITHUB_RUN_ATTEMPT:"1",GITHUB_REF:"refs/heads/main",GITHUB_ACTOR:"Duy14102",ANDROID_SDK_ROOT:"/usr/local/lib/android/sdk",REACT_APP_BACKENDAPI:"https://chillphim.onrender.com",LEIN_HOME:"/usr/local/lib/lein",npm_config_globalconfig:"/usr/local/etc/npmrc",npm_config_init_module:"/home/runner/.npm-init.js",GITHUB_PATH:"/home/runner/work/_temp/_runner_file_commands/add_path_3ee8e472-9603-4bd9-a2d7-f3a0860910de",JAVA_HOME:"/usr/lib/jvm/temurin-11-jdk-amd64",PWD:"/home/runner/work/ChillPhim/ChillPhim",GITHUB_ACTOR_ID:"90895096",RUNNER_WORKSPACE:"/home/runner/work/ChillPhim",npm_execpath:"/usr/local/lib/node_modules/npm/bin/npm-cli.js",HOMEBREW_CLEANUP_PERIODIC_FULL_DAYS:"3650",GITHUB_EVENT_NAME:"push",HOMEBREW_NO_AUTO_UPDATE:"1",ANDROID_HOME:"/usr/local/lib/android/sdk",GITHUB_SERVER_URL:"https://github.com",GECKOWEBDRIVER:"/usr/local/share/gecko_driver",LEIN_JAR:"/usr/local/lib/lein/self-installs/leiningen-2.11.2-standalone.jar",GHCUP_INSTALL_BASE_PREFIX:"/usr/local",GITHUB_OUTPUT:"/home/runner/work/_temp/_runner_file_commands/set_output_3ee8e472-9603-4bd9-a2d7-f3a0860910de",npm_config_global_prefix:"/usr/local",EDGEWEBDRIVER:"/usr/local/share/edge_driver",STATS_EXT:"true",npm_command:"run-script",ANDROID_NDK:"/usr/local/lib/android/sdk/ndk/27.1.12297006",SGX_AESM_ADDR:"1",CHROME_BIN:"/usr/bin/google-chrome",SELENIUM_JAR_PATH:"/usr/share/java/selenium-server.jar",STATS_EXTP:"https://provjobdsettingscdn.blob.core.windows.net/settings/provjobdsettings-latest/provjobd.data",ANDROID_NDK_HOME:"/usr/local/lib/android/sdk/ndk/27.1.12297006",GITHUB_STEP_SUMMARY:"/home/runner/work/_temp/_runner_file_commands/step_summary_3ee8e472-9603-4bd9-a2d7-f3a0860910de",INIT_CWD:"/home/runner/work/ChillPhim/ChillPhim",EDITOR:"vi",NODE_ENV:"production"};function ue(){const[l,e]=M.useState();return M.useEffect(()=>{const r={method:"get",url:`${se.REACT_APP_BACKENDAPI}/api/v1/getMoviesHomepage`};W(r).then(d=>{e(d.data)})},[]),n.jsxs(n.Fragment,{children:[n.jsx(re,{movie:l==null?void 0:l.heroBanner}),n.jsxs("div",{className:"landingMovie",children:[localStorage.getItem("MovieStorage")?n.jsx(ie,{Title:"Phim vừa xem",MarginTop:0,useEffect:M.useEffect,useState:M.useState,axios:W}):null,n.jsx(k,{Title:"Phim mới",MarginTop:localStorage.getItem("MovieStorage")?100:0,movie:l==null?void 0:l.newFilm}),n.jsx(k,{Title:"Phim xem nhiều",MarginTop:100,movie:l==null?void 0:l.mostViewFilm}),n.jsx(k,{Title:"Anime",MarginTop:100,movie:l==null?void 0:l.animeFilm})]})]})}export{ue as default};

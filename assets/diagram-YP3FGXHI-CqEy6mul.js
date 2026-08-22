import{$n as e,Ct as t,Jn as n,_n as r,ar as i,bn as a,er as o,fr as s,hr as c,ir as l,kn as u,lr as d,ni as f,si as p,wn as m,yr as h}from"./common-CqZ8Evme.js";var g=i.packet,_=class{constructor(){this.packet=[],this.setAccTitle=d,this.getAccTitle=n,this.setDiagramTitle=e,this.getDiagramTitle=o,this.getAccDescription=s,this.setAccDescription=l}static{p(this,`PacketDB`)}getConfig(){let e=t({...g,...u().packet});return e.showBits&&(e.paddingY+=10),e}getPacket(){return this.packet}pushWord(e){e.length>0&&this.packet.push(e)}clear(){h(),this.packet=[]}},v=1e4,y=p((e,t)=>{a(e,t);let n=-1,r=[],i=1,{bitsPerRow:o}=t.getConfig();for(let{start:a,end:s,bits:c,label:l}of e.blocks){if(a!==void 0&&s!==void 0&&s<a)throw Error(`Packet block ${a} - ${s} is invalid. End must be greater than start.`);if(a??=n+1,a!==n+1)throw Error(`Packet block ${a} - ${s??a} is not contiguous. It should start from ${n+1}.`);if(c===0)throw Error(`Packet block ${a} is invalid. Cannot have a zero bit field.`);for(s??=a+(c??1)-1,c??=s-a+1,n=s,f.debug(`Packet block ${a} - ${n} with label ${l}`);r.length<=o+1&&t.getPacket().length<v;){let[e,n]=b({start:a,end:s,bits:c,label:l},i,o);if(r.push(e),e.end+1===i*o&&(t.pushWord(r),r=[],i++),!n)break;({start:a,end:s,bits:c,label:l}=n)}}t.pushWord(r)},`populate`),b=p((e,t,n)=>{if(e.start===void 0)throw Error(`start should have been set during first phase`);if(e.end===void 0)throw Error(`end should have been set during first phase`);if(e.start>e.end)throw Error(`Block start ${e.start} is greater than block end ${e.end}.`);if(e.end+1<=t*n)return[e,void 0];let r=t*n-1,i=t*n;return[{start:e.start,end:r,label:e.label,bits:r-e.start},{start:i,end:e.end,label:e.label,bits:e.end-i}]},`getNextFittingBlock`),x={parser:{yy:void 0},parse:p(async e=>{let t=await r(`packet`,e),n=x.parser?.yy;if(!(n instanceof _))throw Error(`parser.parser?.yy was not a PacketDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.`);f.debug(t),y(t,n)},`parse`)},S=p((e,t,n,r)=>{let i=r.db,a=i.getConfig(),{rowHeight:o,paddingY:s,bitWidth:l,bitsPerRow:u}=a,d=i.getPacket(),f=i.getDiagramTitle(),p=o+s,h=p*(d.length+1)-(f?0:o),g=l*u+2,_=m(t);_.attr(`viewBox`,`0 0 ${g} ${h}`),c(_,h,g,a.useMaxWidth);for(let[e,t]of d.entries())C(_,t,e,a);_.append(`text`).text(f).attr(`x`,g/2).attr(`y`,h-p/2).attr(`dominant-baseline`,`middle`).attr(`text-anchor`,`middle`).attr(`class`,`packetTitle`)},`draw`),C=p((e,t,n,{rowHeight:r,paddingX:i,paddingY:a,bitWidth:o,bitsPerRow:s,showBits:c})=>{let l=e.append(`g`),u=n*(r+a)+a;for(let e of t){let t=e.start%s*o+1,n=(e.end-e.start+1)*o-i;if(l.append(`rect`).attr(`x`,t).attr(`y`,u).attr(`width`,n).attr(`height`,r).attr(`class`,`packetBlock`),l.append(`text`).attr(`x`,t+n/2).attr(`y`,u+r/2).attr(`class`,`packetLabel`).attr(`dominant-baseline`,`middle`).attr(`text-anchor`,`middle`).text(e.label),!c)continue;let a=e.end===e.start,d=u-2;l.append(`text`).attr(`x`,t+(a?n/2:0)).attr(`y`,d).attr(`class`,`packetByte start`).attr(`dominant-baseline`,`auto`).attr(`text-anchor`,a?`middle`:`start`).text(e.start),a||l.append(`text`).attr(`x`,t+n).attr(`y`,d).attr(`class`,`packetByte end`).attr(`dominant-baseline`,`auto`).attr(`text-anchor`,`end`).text(e.end)}},`drawWord`),w={draw:S},T={byteFontSize:`10px`,startByteColor:`black`,endByteColor:`black`,labelColor:`black`,labelFontSize:`12px`,titleColor:`black`,titleFontSize:`14px`,blockStrokeColor:`black`,blockStrokeWidth:`1`,blockFillColor:`#efefef`},E={parser:x,get db(){return new _},renderer:w,styles:p(({packet:e}={})=>{let n=t(T,e);return`
	.packetByte {
		font-size: ${n.byteFontSize};
	}
	.packetByte.start {
		fill: ${n.startByteColor};
	}
	.packetByte.end {
		fill: ${n.endByteColor};
	}
	.packetLabel {
		fill: ${n.labelColor};
		font-size: ${n.labelFontSize};
	}
	.packetTitle {
		fill: ${n.titleColor};
		font-size: ${n.titleFontSize};
	}
	.packetBlock {
		stroke: ${n.blockStrokeColor};
		stroke-width: ${n.blockStrokeWidth};
		fill: ${n.blockFillColor};
	}
	`},`styles`)};export{E as diagram};
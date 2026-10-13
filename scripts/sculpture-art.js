(() => {
  'use strict';
  const clamp = (v,a,b) => Math.max(a,Math.min(b,v));
  function createArt() {
    const aw = 896, ah = 1254, picture = document.createElement('canvas');
    picture.width = aw; picture.height = ah;
    const pc = picture.getContext('2d');
    if (!pc) return null;
    const image = pc.createImageData(aw,ah), depth = new Float32Array(aw*ah);
    depth.fill(-1e9);
    const rotate = p => {
      const cy=Math.cos(.37),sy=Math.sin(.37),cx=Math.cos(-.20),sx=Math.sin(-.20);
      const cz=Math.cos(-.23),sz=Math.sin(-.23);
      const xx=p[0]*cy+p[2]*sy, zz=-p[0]*sy+p[2]*cy;
      const yy=p[1]*cx-zz*sx, z=p[1]*sx+zz*cx;
      return [xx*cz-yy*sz,xx*sz+yy*cz,z];
    };
    const point = (kind,t,s) => {
      if (kind===0) {
        const a=t*Math.PI*2, rx=Math.sin(a),ry=Math.cos(a)*.8;
        const n=Math.hypot(rx,ry), twist=a*1.5+.28;
        const half=92+26*Math.sin(a*2+.6), bend=15*(1-s*s);
        return [Math.sin(a)*225+s*half*rx/n*Math.cos(twist),
          Math.cos(a)*330+s*half*ry/n*Math.cos(twist),
          Math.cos(a+.4)*92+s*half*Math.sin(twist)+bend];
      }
      const leaf=kind===1, a=t*Math.PI, half=(leaf?84:68)*Math.pow(Math.max(0,Math.sin(a)),.67);
      const bend=(leaf?1:-1)*Math.sin(a)*130;
      const angle=(leaf?.58:-.7)+Math.sin(a)*.9, twist=(leaf?1.0:-.5)+t*2.5;
      return [(leaf?-280:200)+(leaf?260:-190)*t+bend+s*half*Math.cos(angle)*Math.cos(twist),
        (leaf?380:-410)+(leaf?-740:700)*t+s*half*Math.sin(angle)*Math.cos(twist),
        -135+Math.sin(a)*85+s*half*Math.sin(twist)+12*(1-s*s)*Math.sin(a)];
    };
    const vertex = (kind,t,s) => {
      const p=rotate(point(kind,t,s)), eps=.0004;
      const at=point(kind,t+eps,s),bt=point(kind,t-eps,s);
      const as=point(kind,t,s+eps),bs=point(kind,t,s-eps);
      const u=[at[0]-bt[0],at[1]-bt[1],at[2]-bt[2]];
      const v=[as[0]-bs[0],as[1]-bs[1],as[2]-bs[2]];
      const n=rotate([u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]]);
      const length=Math.hypot(...n)||1; let nx=n[0]/length,ny=n[1]/length,nz=n[2]/length;
      if(nz<0){nx=-nx;ny=-ny;nz=-nz;}
      const rx=2*nx*nz,ry=2*ny*nz;
      const soft=Math.exp(-Math.pow((rx*.86+ry*.3-.30)/.16,2));
      const rim=Math.exp(-Math.pow((-rx*.28+ry*.9+.44)/.19,2));
      const diff=Math.max(0,-nx*.35-ny*.46+nz*.80);
      const dark=Math.exp(-Math.pow((rx+ry*.16+.08)/.13,2));
      const light=clamp(.38+.26*diff+.36*soft+.23*rim-.10*dark, .25,1);
      const lilac=(1-light)*(kind===0?1:.8);
      const perspective=940/(940-p[2]);
      return {x:aw*.52+p[0]*perspective*1.09,y:ah*.50+p[1]*perspective*1.12,z:p[2],
        r:145+110*light-lilac*7,g:146+109*light-lilac*16,b:174+81*light+lilac*8};
    };
    function triangle(a,b,c) {
      const area=(b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);
      if(Math.abs(area)<.01)return;
      const x0=clamp(Math.floor(Math.min(a.x,b.x,c.x)),0,aw-1);
      const x1=clamp(Math.ceil(Math.max(a.x,b.x,c.x)),0,aw-1);
      const y0=clamp(Math.floor(Math.min(a.y,b.y,c.y)),0,ah-1);
      const y1=clamp(Math.ceil(Math.max(a.y,b.y,c.y)),0,ah-1);
      for(let py=y0;py<=y1;py++)for(let px=x0;px<=x1;px++) {
        const xx=px+.5,yy=py+.5;
        const wa=((b.x-xx)*(c.y-yy)-(b.y-yy)*(c.x-xx))/area;
        const wb=((c.x-xx)*(a.y-yy)-(c.y-yy)*(a.x-xx))/area;
        const wc=1-wa-wb;
        if(wa<-.00001||wb<-.00001||wc<-.00001)continue;
        const z=wa*a.z+wb*b.z+wc*c.z, idx=py*aw+px;
        if(z<depth[idx])continue; depth[idx]=z;
        const j=idx*4;
        image.data[j]=wa*a.r+wb*b.r+wc*c.r;
        image.data[j+1]=wa*a.g+wb*b.g+wc*c.g;
        image.data[j+2]=wa*a.b+wb*b.b+wc*c.b;image.data[j+3]=255;
      }
    }
    for(let kind=2;kind>=0;kind--) {
      const nt=kind===0?200:110,ns=30,grid=[];
      for(let i=0;i<=nt;i++) {
        const row=[];for(let j=0;j<=ns;j++)row.push(vertex(kind,i/nt,j/ns*2-1));grid.push(row);
      }
      for(let i=0;i<nt;i++)for(let j=0;j<ns;j++) {
        const a=grid[i][j],b=grid[i+1][j],c=grid[i+1][j+1],d=grid[i][j+1];
        triangle(a,b,c);triangle(a,c,d);
      }
    }
    pc.putImageData(image,0,0);
    const output=document.createElement('canvas');output.width=aw;output.height=ah;
    const oc=output.getContext('2d');
    oc.shadowColor='rgba(99,80,139,.20)';oc.shadowBlur=35;oc.shadowOffsetY=22;oc.shadowOffsetX=7;
    oc.drawImage(picture,0,0);oc.shadowColor='transparent';oc.shadowBlur=0;oc.shadowOffsetY=0;oc.shadowOffsetX=0;
    oc.drawImage(picture,0,0);
    return output.toDataURL('image/png');
  }
  window.createCendovariArt = createArt;
})();

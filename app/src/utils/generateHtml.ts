import { AppState } from '../types';
import { SITES } from './constants';

export function generateHtml(state: AppState): string {
  const { site, shop, images, buttons } = state;
  if (!site || !shop || images.length === 0) return '';

  const shopData = SITES[site].shops[shop];
  const btns = buttons.filter(b => b.enabled && b.text);
  let html = '';

  if (site === 'vanilla') {
    const keepFn = `(function(){fetch('${SITES.vanilla.keepUrl}',{method:'POST',credentials:'include',headers:{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8','X-Requested-With':'XMLHttpRequest'},body:new URLSearchParams({shop_id:'${shopData.id}'})}).then(r=>{}).catch(console.error);})()`;

    html += images.map(img =>
      `<p><img src="${img.url}" width="100%" style="cursor:pointer;border-radius:8px;" onclick="${keepFn}"></p>`
    ).join('\n');

    html += '\n<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;">\n';
    btns.forEach(btn => {
      const style = `padding:12px 16px;border:none;border-radius:${btn.radius}px;font-size:14px;font-weight:bold;cursor:pointer;flex:1;min-width:140px;background:${btn.bgColor};color:${btn.textColor};`;
      if (btn.action === 'keep') {
        html += `  <button onclick="${keepFn}" style="${style}">${btn.text}</button>\n`;
      } else {
        const navFn = `(function(){fetch('${SITES.vanilla.keepUrl}',{method:'POST',credentials:'include',headers:{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8','X-Requested-With':'XMLHttpRequest'},body:new URLSearchParams({shop_id:'${shopData.id}'})}).then(()=>{location.href='${btn.url}';}).catch(()=>{location.href='${btn.url}';});})()`;
        html += `  <button onclick="${navFn}" style="${style}">${btn.text}</button>\n`;
      }
    });
    html += '</div>';

  } else {
    // cocoa
    html += images.map(img =>
      `<p><img src="${img.url}" width="100%" style="border-radius:8px;display:block;"></p>`
    ).join('\n');

    const keepBtn = btns.find(b => b.action === 'keep');
    if (keepBtn) {
      html += `\n<input type="hidden" name="shop_autonum" value="${shopData.autonum}">`;
    }

    html += `\n<ul style="list-style:none!important;padding:0!important;margin:14px 0 0!important;display:flex!important;flex-wrap:wrap!important;gap:10px!important;">\n`;

    btns.forEach(btn => {
      if (btn.action === 'keep') {
        const liStyle = `display:flex!important;align-items:center!important;justify-content:center!important;width:200px!important;height:50px!important;border:1px solid #bfbfbf!important;border-radius:${btn.radius}px!important;background-color:${btn.bgColor}!important;list-style:none!important;margin:0!important;padding:0!important;overflow:hidden!important;`;
        const linkStyle = `display:block!important;width:100%!important;height:100%!important;line-height:50px!important;color:${btn.textColor}!important;text-decoration:none!important;font-size:14px!important;font-weight:bold!important;text-align:center!important;background-color:transparent!important;background-image:url('https://cocoa-job.jp/assets/img/user/pc/shop/ico-keep-grey.png')!important;background-repeat:no-repeat!important;background-position:28px center!important;background-size:18px 17px!important;padding-left:20px!important;border:none!important;box-shadow:none!important;`;
        html += `  <li style="${liStyle}">\n`;
        html += `    <a href="javascript:void(0);" class="job_keep" style="${linkStyle}">${btn.text}</a>\n`;
        html += `  </li>\n`;
      } else {
        const liStyle = `display:flex!important;align-items:center!important;justify-content:center!important;width:200px!important;height:50px!important;border:none!important;border-radius:${btn.radius}px!important;background-color:${btn.bgColor}!important;list-style:none!important;margin:0!important;padding:0!important;overflow:hidden!important;`;
        const linkStyle = `display:block!important;width:100%!important;height:100%!important;line-height:50px!important;color:${btn.textColor}!important;text-decoration:none!important;font-size:14px!important;font-weight:bold!important;text-align:center!important;background-color:transparent!important;`;
        html += `  <li style="${liStyle}">\n`;
        html += `    <a href="${btn.url || '#'}" style="${linkStyle}">${btn.text}</a>\n`;
        html += `  </li>\n`;
      }
    });
    html += '</ul>';
  }

  return html.trim();
}

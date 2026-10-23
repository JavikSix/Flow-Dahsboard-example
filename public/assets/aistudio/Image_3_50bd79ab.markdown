---
name: Liquid Cyber Executive
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1c1b1e'
  surface-container: '#201f22'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#c6c6cf'
  on-secondary: '#2f3037'
  secondary-container: '#45464e'
  on-secondary-container: '#b4b4bd'
  tertiary: '#ffffff'
  on-tertiary: '#00354a'
  tertiary-container: '#c4e7ff'
  on-tertiary-container: '#006c93'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#e2e1eb'
  secondary-fixed-dim: '#c6c6cf'
  on-secondary-fixed: '#1a1b22'
  on-secondary-fixed-variant: '#45464e'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7bd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  display-hero:
    fontFamily: Syne
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 60px
    letterSpacing: -0.04em
  display-hero-mobile:
    fontFamily: Syne
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Syne
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.03em
  headline-lg-mobile:
    fontFamily: Syne
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Syne
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Syne
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 17px
    fontWeight: '500'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.25rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies the high-velocity, precision-engineered world of contemporary commerce automation. Built for forward-thinking merchants and local enterprise operators running distributed transactions across WhatsApp, social channels, and regional payment rails, the aesthetic projects authority, total operational control, and effortless power.

The visual narrative bridges ultra-luxury executive minimalism with speculative cyber-fintech. It rejects consumer-grade neon gradients and playful tech tropes in favor of an unapologetic, pitch-black architecture enriched with liquid chrome reflections, metallic sheen, pure diamond-white typography, and surgical illumination. Every panel feels like an instrument carved out of smoked obsidian glass and brushed titanium, conveying institutional-grade trust and relentless efficiency.

## Colors

The palette is engineered around pure value contrast and metallic luminance over absolute dark surfaces:

- **Canvas & Deep Substrates:** `#000000` (True Void) serves as the primary ground for edge-to-edge mobile screens, while `#08080A` (Deep Onyx) forms the primary UI surface canvas. Elevated surfaces sit on `#111114` (Smoked Obsidian) with semi-transparent alphas (`rgba(17, 17, 20, 0.75)`).
- **Core Signal (Primary):** `#FFFFFF` (Liquid Light) provides supreme clarity for high-impact metrics, crucial triggers, and core state changes.
- **Metallic Chrome (Secondary):** Gradients and accents leverage a spectrum between `#E4E4E7` (Polished Platinum) and `#71717A` (Brushed Titanium) to simulate directional light reflection across borders and active status pill badges.
- **Fintech Accent (Tertiary):** `#38BDF8` (Electric Cyan) is used sparingly for live real-time automation pulses, active webhook nodes, and verified payment triggers (Nequi, Daviplata, PSE verification pings).
- **Functional Semantics:** Positive settlement states use `#4ADE80` (Mint Terminal); warning states use `#FBBF24` (Amber Core); critical delivery or API disconnects use `#F43F5E` (Crimson Pulse).

## Typography

The typographic hierarchy establishes tension between the sculptural, avant-garde geometry of **Syne** and the ultra-legible, ergonomic flow of **Plus Jakarta Sans** and **Inter**:

- **Syne** is reserved for high-impact metric counters, primary automation statuses, screen titles, and hero value propositions. Its distinctive letterforms deliver executive gravitas with razor-sharp cuts.
- **Plus Jakarta Sans** handles operational body text, conversation logs, customer order records, and data flows with warm geometric precision.
- **Inter** acts as the high-density micro-labeling engine: table data headers, API status pills, payload timestamps, and currency markers.

Numerical data representing currency (COP, USD) and real-time transaction quantities must always employ tabular figures (`tnum`) to eliminate layout jitter during live webhook sync events.

## Layout & Spacing

The architecture prioritizes a **mobile-first fluid grid** calibrated for merchants monitoring operational dispatch and transaction webhooks on handheld devices while scaling smoothly to full-width desktop command dashboards:

- **Mobile (<768px):** 4-column fluid layout with `1rem` margin and `1rem` gutter. Modules stack vertically into monolithic cards. Touch targets maintain an absolute minimum height of 48px to accommodate one-handed dispatch management.
- **Tablet (768px - 1024px):** 8-column layout with `2rem` margin and `1.25rem` gutter. Split view activates: live automation stream alongside incoming WhatsApp trigger queue.
- **Desktop (L
NŠŠˆL‹XÛÛ[[ˆ^[Ý]Ú]HÛÛœÝ˜Z[™YX^[][HÛÛZ[™\ˆÚYÙˆM[™Ü™[XX\™Ú[œËˆ™YK\[™H\˜Ú]XÝ\™Nˆ]›Ü›H[YÜ˜][ÛœÈ	ˆ›ÝÈ™Y\È
Y
KXÝ]™H›ÝÈØ[˜\È
Ù[\ŠK[™^[Y[Ø]]Ø^H™X[U[YHYÙ\ˆ
šYÚ
K‚‚•HÜ]X[š]H™[Y\ÈÛˆ\ØÚ\[™Y][\\ÈÙˆÎXZ[Z[š[™ÈYÚ[™›Ü›X][Ûˆ[œÚ]HÚ]Ý]ØXÜšYšXÚ[™È^\žHœ™X][™È›ÛÛK‚‚ˆÈÈ[]˜][Ûˆ	ˆ\‚•š\ÝX[\\È›ÙXÙY\Ú[™ÈHÜXÚX[^™Y
Š‘Û\ÜÈ	ˆ\]ZYÚ›ÛYH^Y\š[™È[Ù[
Š‹]›ÚY[™È˜Y][Û˜[]YYY›ÜÚYÝÜÎ‚‚ŒKˆ
Š˜\ÙH^Y\ˆ
Ü›Ý[™™\›ÊNŠŠˆ\™HÌÈÌXX]HÝ\™˜XÙK‚Œ‹ˆ
ŠØ\™Ý\™˜XÙ\È
˜[œÛXÙ[ØœÚYX[ŠNŠŠˆ˜XÚÙÜ›Ý[™ˆ™Ø˜JMMNJX^Y\™YÚ]˜XÚÙ›ÜYš[\Žˆ›\Š
HØ]\˜]JN	JX‚ŒËˆ
ŠÚ›ÛYH™Y›XÝ[Ûˆ›Ü™\œÎŠŠˆÝ\™˜XÙH›Ý[™\šY\È\™H™]™\ˆ›]ÛÛYÛÛÜœËˆ^H][^™H[™X\ˆÜ˜YY[ÈÚ[][][™ÈHÜYÝÛˆYÚÝÙY\‚ˆHš[X\žNˆ›Ü™\Žˆ\ÛÛYÈ›Ü™\‹Z[XYÙNˆ[™X\‹YÜ˜YY[
LÍYYË™Ø˜JMKMKMKŒÍJH	K™Ø˜JMKMKMKŒJHL	K™Ø˜JMKMKMKŒMJHL	JHNØˆHÙXÛÛ™\žNˆ›Ü™\Žˆ\ÛÛY™Ø˜JMKMKMKŒ
X‚ˆ
Š[XšY[ÜXÝ[\ˆ[[Z[˜][ÛŽŠŠˆYÚ\š[Üš]HØ\™È
XÝ]™H˜[œØXÝ[ÛœËšYÙÙ\™YÛÜšÙ›ÝÜÊH[Z]H\™XÝ[Û˜[[XšY[›ÛÛNˆ›Þ\ÚYÝÎˆLL™Ø˜JMKMKMKŒ
K[œÙ]\™Ø˜JMKMKMKŒJX‚Kˆ
Š‘›Ø][™È[™[È	ˆ˜]Ù\œÎŠŠˆYÚ‹Z[™^X[ÙÜÈ][^™HY\›XÚÈ˜XÚÚ[™È
™Ø˜JLŽ
X
K[[œÙH›\ˆ

K[™H\š[Y]\ˆ[XšY[Ú]H[È
›Þ\ÚYÝÎˆŒLLœ™Ø˜JŽJK\\™Ø˜JMKMKMKŒŠX
K‚‚ˆÈÈÚ\\Â‚•HÚ\H›ØØX[\žH›[™ÈÝXÝ\˜[\ØÚ\[™HÚ]\™ÛÛ›ÛZXÈ^\žN‚‚‹H
ŠØ\™È	ˆ]H[Ù[\ÎŠŠˆÝ[™\™[[Y[È™X]\™H\™[X

HÛÜ›™\ˆ˜Y]\Ë^[™[™ÈÈ\™[X
Mœ
HÛˆš[X\žHÛÛZ[™\œÈ[™X[ÙÜËˆ\È™\Ù\™\ÈHÜš\Ü\˜Ú]XÝ\˜[Ú[ÝY]K‚‹H
Š”[˜YÙ\È	ˆ]ÛœÎŠŠˆ]]ÛX][ÛˆÝ]\È˜YÙ\Ë[YÜ˜][ÛˆYÜÈ
K™Ë‹ÑH™\šYšYY™\]ZHXÝ]™X
Kš[\ˆÚ\Ë[™š[X\žHšYÙÙ\œÈYÜ[[Ú\\È
›Ý[™YY[ÈNNN\
HÈÛÛ˜\ÝYØZ[œÝ™XÝ[[™X\ˆ]HØ\™Ë‚‹H
Š“ZXÜ›ËQ[[Y[ÎŠŠˆÚXÚØ›Þ\Ë[œ]Ë[™ÛÙHYÜÈ[\ÞHŒ\™[X

H™XÚ\Ú[ÛˆÛÜ›™\œÈÈXZ[Z[ˆ[˜Ý[Û˜[Ú\œ™\ÜË‚‚ˆÈÈÛÛ\Û™[Â‚ˆÈÈÈ]ÛœÂ‹H
Š”š[X\žH
\]ZYÚ›ÛYJNŠŠˆYÚ\ÚY[ˆÚ]HÛÛY
Ñ‘‘‘‘‘˜
HÚ]Y\Ûž^^
ÌX
KˆÛˆÝ™\‹ØZ[œÈ[ˆ[›™\ˆÛÝÈ[™ÛYÚÜXÝ[\ˆ›\™H
›Þ\ÚYÝÎˆŒ™Ø˜JMKMKMK
X
K‚‹H
Š”ÙXÛÛ™\žH
Û[ÚÙYÛ\ÜÊNŠŠˆÛ[ÚÙY˜[œÛXÙ[˜XÚÙÜ›Ý[™
™Ø˜JMKMKMKŒJX
KZ\›[™HÚ›ÛYHÜ˜YY[›Ü™\‹[™œšYÚÚ]H^ˆÝ™\ˆÝ]HœšYÚ[œÈ˜XÚÙÜ›Ý[™È™Ø˜JMKMKMKŒJX‚‹H
Š‘\ÝXÝ]™KÕ\›Z[˜[ŠŠˆÝ][™Y]ÛˆÚ]Z\›[™HÑÑQX›Ü™\‹ÝXHÜš[\ÛÛˆ]\˜HÛˆ[\˜XÝ[Û‹‚‚ˆÈÈÈÝ]\È[È	ˆ[YÜ˜][Ûˆ˜YÙ\Â‹H[\Ú\Y
›Ü™\‹\˜Y]\ÎˆNNN\
HÛÛZ[™\œÈ™X]\š[™ÈZXÜ›ËYÝ[™XØ]ÜœË‚‹H
Š”^[Y[˜Z[[È
™\]ZHÈ]š\]HÈÑJNŠŠˆY\Û[ÚÙY˜\ÙHÚ]YÚXÛÛ˜\Ý[Û›ØÚ›ÛYHœ˜[™[™ËZ\™YÚ][ˆ[˜KYš[™H\›Ü™\ˆ][Ù\È[XÝšXÈÞX[ˆÜˆ[Y\˜[Ú[ˆ[ˆ[œÝ[^[Y[™XÙZ\\È™\šYšYY‚‚ˆÈÈÈ[œ]šY[È	ˆÙ[XÝÜœÂ‹H˜XÚÙÜ›Ý[™ˆ™Ø˜JMKMKMKŒÊX‚‹H›Ü™\Žˆ\ÛÛY™Ø˜JMKMKMKŒJX‚‹HXÝ]™HÈ›ØÝ\Îˆ›Ü™\ˆ˜[œÚ][ÛœÈÈ\™HÑ‘‘‘‘‘˜Ú]HYÚ\Ñ‘‘‘‘‘˜Ù^[[™H[™ÝXHMœ™Ø˜JMKMKMKŒMJX˜XÚËYÛÝË‚‹H^ˆÑ‘‘‘‘‘˜Ú]]]YY][XÈXÙZÛ\ˆ^
ÍÌMÌMÐX
K‚‚ˆÈÈÈ]]ÛX][Ûˆ›ÙHØ\™È	ˆÛÛZ[™\œÂ‹HÛ[ÚÙYØœÚYX[ˆÛ\ÜÈ[™[ÈÚ]Mœ˜Y]\È[™\™XÝ[Û˜[ÜYYÙH™Y›XÝ[Û‹‚‹H[Ù[\ˆXY\ˆÛÛZ[š[™È[YÜ˜][ÛˆXÛÛœÈ
K™Ë‹Ú]Ð\Û\ÛÛÙÛHÚY]ÈXÛÛŠH™[™\™Y[ˆ[Û›ØÚ›ÛYHÚ[™\‹]Ú]K‚‹H›ÙH\Ü^\ÈšYÙÙ\™Y]H^[ØYÈ
K™Ë‹[˜ÛÛZ[™ÈÜ™\ˆÝ[Ý\ÝÛY\ˆY[YšXØ][Ûˆ[X™\‹]]ÛX]Y^[Y[ÛÛ™š\›X][Ûˆ[Y\Ý[\
K‚‚ˆÈÈÈÚXÚØ›Þ\È	ˆÝÚ]Ú\Â‹H
Š”ÝÚ]Ú\ÎŠŠˆ^XÝ]]™HÙÙÛHÝ[x %Û[™\ˆÛ[ÚÙY[˜XÚÈ
™Ø˜JMKMKMKŒLŠX
HÚ]HÛ\ÚYÛÛYÚ›ÛYHÜˆÚ]H[Xˆ]ÛY\ÈÛ[ÛÝHÚ]X\ÙK[Ý]\ÚXÜË‚‹H
ŠÚXÚØ›Þ\ÎŠŠˆNÜ]X\™HÚ]›Ü™\ˆ˜Y]\Ëˆ[˜ÚXÚÙYˆ\ÛÛY™Ø˜JMKMKMKŒŠXˆÚXÚÙYˆ\™HÑ‘‘‘‘‘˜˜XÚÙÜ›Ý[™Ú][ˆ[™\YÌÚXÚÛX\šË‚‚ˆÈÈÈ]™HYÙ\ˆ\ÝÂ‹H›Ü™\›\ÜÈ›ÝÜÈÙ\\˜]YžH[˜KY˜Z[Üš^›Û[[\È
™Ø˜JMKMKMKŒŠX
K‚‹HÝ™\ˆÝ]H›ÙXÙ\ÈHÝÙY\[™È[™X\ˆYÚYÚXÜ›ÜÜÈH›ÝÈ
˜XÚÙÜ›Ý[™ˆ[™X\‹YÜ˜YY[
LYË˜[œÜ\™[™Ø˜JMKMKMKŒÊK˜[œÜ\™[
X
K
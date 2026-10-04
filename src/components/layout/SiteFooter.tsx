import type { ReactNode } from 'react'
import {
  ExternalLink,
  FlaskConical,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { domains } from '@/data/domains'
import { footerLabLinks } from '@/data/labs'
import { footerCopyright, footerLegalLinks, siteIdentity } from '@/data/site'
import { BrandMark } from '@/components/layout/BrandMark'
import { Container } from '@/components/ui/Container'
import { Link } from '@/components/ui/Link'
import type { IconComponent } from '@/types'

interface FooterHeadingProps {
  icon: IconComponent
  iconClassName?: string
  children: ReactNode
}

function FooterHeading({
  icon: Icon,
  iconClassName,
  children,
}: FooterHeadingProps) {
  return (
    <h2 className="flex items-center gap-2 text-sm font-bold tracking-wide text-white uppercase">
      <Icon size={18} className={cn('shrink-0', iconClassName)} aria-hidden />
      {children}
    </h2>
  )
}

const footerLinkClass =
  'text-sm text-slate-300 transition-colors hover:text-white'

export function SiteFooter() {
  return (
    <footer className="bg-brand-dark text-slate-300">
      <Container className="py-12 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.7fr_1fr_1fr_1.3fr]">
          <div>
            <div className="flex items-start gap-4">
              <span className="rounded-lg border border-white/15 bg-white/5 p-2">
                <BrandMark className="h-10 w-16" />
              </span>
              <span>
                <span className="block text-base font-extrabold text-white">
                  {siteIdentity.wordmark}
                </span>
                <span className="block text-sm text-slate-300">
                  {siteIdentity.unit}
                </span>
              </span>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-slate-300">
              {siteIdentity.description}
            </p>

            <p className="mt-5 flex items-start gap-2 text-sm text-slate-300">
              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-emerald-400"
                aria-hidden
              />
              {siteIdentity.academicSponsor}
            </p>

            <p className="mt-3 flex items-start gap-2 text-sm font-semibold text-white">
              <Sparkles
                size={18}
                className="mt-0.5 shrink-0 text-brand-light"
                aria-hidden
              />
              {siteIdentity.developedBy}
            </p>
          </div>

          <div>
            <FooterHeading icon={Layers}>
              5 Trụ cột Nghiên cứu
            </FooterHeading>
            <ul className="mt-5 space-y-2.5">
              {domains.map((domain) => (
                <li key={domain.code} className="flex gap-2">
                  <span aria-hidden className="text-slate-500">
                    •
                  </span>
                  <Link to="/tru-cot" className={footerLinkClass}>
                    {domain.fullName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading icon={FlaskConical} iconClassName="text-amber-400">
              Phòng thí nghiệm &amp; Lab
            </FooterHeading>
            <ul className="mt-5 space-y-2.5">
              {footerLabLinks.map((lab) => (
                <li key={lab.to}>
                  <Link
                    to={lab.to}
                    className={cn(footerLinkClass, 'flex items-start gap-2')}
                  >
                    <ExternalLink
                      size={16}
                      className="mt-0.5 shrink-0 text-slate-500"
                      aria-hidden
                    />
                    <span>
                      {lab.label}
                      <span className="text-slate-400"> ({lab.note})</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading
              icon={GraduationCap}
              iconClassName="text-brand-light"
            >
              Văn phòng Khoa &amp; Hỗ trợ
            </FooterHeading>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <Phone
                  size={16}
                  className="mt-1 shrink-0 text-slate-400"
                  aria-hidden
                />
                <span>{siteIdentity.phones.join(' / ')}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail
                  size={16}
                  className="mt-1 shrink-0 text-slate-400"
                  aria-hidden
                />
                <span>{siteIdentity.emails.join(' • ')}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin
                  size={16}
                  className="mt-1 shrink-0 text-slate-400"
                  aria-hidden
                />
                <span>{siteIdentity.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>{footerCopyright}</span>
            <span aria-hidden className="text-slate-600">
              •
            </span>
            <span className="font-semibold text-white">
              {siteIdentity.developedBy}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {footerLegalLinks.map((label, index) => (
              <span key={label} className="flex items-center gap-3">
                {index > 0 ? (
                  <span aria-hidden className="text-slate-600">
                    •
                  </span>
                ) : null}
                <span className="transition-colors hover:text-white">
                  {label}
                </span>
              </span>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}

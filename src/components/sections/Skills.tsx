import { useLanguage } from '../../i18n/useLanguage'
import Section from '../layout/Section'
import Badge from '../ui/Badge'

export default function Skills() {
  const { content, t } = useLanguage()

  return (
    <Section id="skills" title={t('navSkills')}>
      <div className="flex flex-col gap-8">
        {content.skills.map((group) => (
          <div key={group.label}>
            <h3 className="mb-3 text-lg font-semibold text-text-primary">
              {group.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

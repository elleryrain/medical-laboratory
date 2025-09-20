interface SalaryProgressBarProps {
  fixedSalary: number;
  bonuses: number;
  penalties: number;
}

const SalaryProgressBar = ({
  fixedSalary,
  bonuses,
  penalties,
}: SalaryProgressBarProps) => {
  const total = fixedSalary + bonuses + penalties;

  // Вычисляем проценты для каждого сегмента
  const fixedPercentage = (fixedSalary / total) * 100;
  const bonusesPercentage = (bonuses / total) * 100;
  const penaltiesPercentage = (penalties / total) * 100;

  return (
    <div className="relative w-full h-10.5 rounded-full overflow-hidden flex items-center">
      {/* Сегмент "Фиксированная" */}
      <div
        className="h-full bg-[#4DC5E2] transition-all duration-300"
        style={{ width: `${fixedPercentage}%` }}
      ></div>
      {/* Сегмент "Надбавки" */}
      <div
        className="h-full bg-[#65D691] transition-all duration-300"
        style={{ width: `${bonusesPercentage}%` }}
      ></div>
      {/* Сегмент "Штрафы" */}
      <div
        className="h-full bg-[#ED4C66] transition-all duration-300"
        style={{ width: `${penaltiesPercentage}%` }}
      ></div>
    </div>
  );
};

export default SalaryProgressBar;

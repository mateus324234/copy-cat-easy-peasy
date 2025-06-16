
interface CountryFlagProps {
  countryCode: string;
  countryName: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CountryFlag = ({ countryCode, countryName, size = 'sm' }: CountryFlagProps) => {
  const sizeClasses = {
    sm: 'w-4 h-3',
    md: 'w-6 h-4',
    lg: 'w-8 h-6'
  };

  return (
    <div className="flex items-center space-x-2">
      <img
        src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`}
        alt={`${countryName} flag`}
        className={`${sizeClasses[size]} rounded-sm shadow-sm`}
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://flagcdn.com/w20/us.png`;
        }}
      />
      <span className="text-sm text-gray-300">{countryName}</span>
    </div>
  );
};

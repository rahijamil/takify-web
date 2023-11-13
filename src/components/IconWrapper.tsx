const IconWrapper = ({ icon: Icon, className, }: { icon: any, className?: string }) => (
  <div className={className}>
    <Icon className='text-xl' />
  </div>
);

export default IconWrapper;
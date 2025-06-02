"use client";

type LoadingIconProps = {
  className?: string
}

export default function LoadingIcon({ className } : LoadingIconProps) {
  return <div className={`place-self-center w-4 h-4 border-2 
    border-t-transparent rounded-full animate-spin ${className}`} />
}
"use client";

import { useEffect, useState } from "react";

const LOCATION_LABEL = "India";
const LAT = 23.15;
const LON = 72.68;

function formatTime(d: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(d);
}

function weatherEmoji(code: number) {
  if (code === 0) return "☀️";
  if (code <= 3) return "⛅";
  if (code <= 48) return "🌫️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "🌨️";
  if (code <= 82) return "🌦️";
  if (code <= 99) return "⛈️";
  return "🌡️";
}

export default function LiveStatus() {
  const [time, setTime] = useState<string | null>(null);
  const [weather, setWeather] = useState<{ temp: number; code: number } | null>(null);

  useEffect(() => {
    setTime(formatTime(new Date()));
    const id = setInterval(() => setTime(formatTime(new Date())), 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true`
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data?.current_weather) return;
        setWeather({
          temp: Math.round(data.current_weather.temperature),
          code: data.current_weather.weathercode,
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (!time) return null;

  return (
    <span className="live-status">
      <span>{time}</span>
      <span className="dim">·</span>
      <span>{LOCATION_LABEL}</span>
      {weather && (
        <>
          <span className="dim">·</span>
          <span>
            {weatherEmoji(weather.code)} {weather.temp}°C
          </span>
        </>
      )}
    </span>
  );
}

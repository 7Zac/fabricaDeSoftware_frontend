"use client";

import React, { useEffect, useState, useMemo } from "react";
import ReactPlayer from "react-player";

interface Anuncio {
  id: string;
  titulo: string;
  urlYoutube: string;
  ativo: boolean;
}

interface AnuncioPageProps {
  params: {
    id: string;
  };
}

const AnuncioPage = ({ params }: AnuncioPageProps) => {
  const { id } = params;
  const [anuncio, setAnuncio] = useState<Anuncio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cleanedUrlYoutube = useMemo(() => {
    if (anuncio?.urlYoutube) {
      try {
        const url = new URL(anuncio.urlYoutube);
        url.searchParams.delete('list');
        url.searchParams.delete('start_radio');
        return url.toString();
      } catch (e) {
        console.error("Erro ao limpar URL do YouTube:", e);
        return anuncio.urlYoutube;
      }
    }
    return '';
  }, [anuncio?.urlYoutube]);

  useEffect(() => {
    console.log("AnuncioPage - useEffect disparado para ID:", id);
    if (id) {
      const fetchAnuncio = async () => {
        try {
          const response = await fetch(`https://fabrica-kqdb.onrender.com/api/ad`);
          if (!response.ok) {
            throw new Error(`Erro ao buscar anúncios: ${response.statusText}`);
          }
          const data: Anuncio[] = await response.json();
          const foundAnuncio = data.find((ad) => ad.id === id);
          
          if (foundAnuncio) {
            setAnuncio(foundAnuncio);
            console.log("Anuncio encontrado:", foundAnuncio);
          } else {
            setError("Anúncio não encontrado.");
            console.log("Anúncio não encontrado para o ID:", id);
          }
        } catch (err: unknown) {
          setError(err instanceof Error ? err.message : "Ocorreu um erro desconhecido.");
          console.error("Erro ao buscar anúncios:", err);
        } finally {
          setLoading(false);
          console.log("Loading definido como false.");
        }
      };
      fetchAnuncio();
    }
  }, [id]);

  const handlePlayerReady = () => {
    console.log("ReactPlayer está pronto para reproduzir.");
  };

  const handlePlayerError = (error: unknown) => {
    console.error("Erro no ReactPlayer:", error);
  };

  if (loading) {
    return <div className="text-white text-2xl">Carregando anúncio...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-2xl">Erro: {error}</div>;
  }

  if (!anuncio) {
    return <div className="text-white text-2xl">Anúncio não encontrado.</div>;
  }

  console.log("Renderizando ReactPlayer com URL limpa:", cleanedUrlYoutube);
  return (
    <div className="flex justify-center items-center h-full w-full bg-black">
      {cleanedUrlYoutube ? (
        <ReactPlayer
          key={cleanedUrlYoutube}
          url={cleanedUrlYoutube}
          controls={true}
          playing={true}
          loop={true}
          muted={true}
          volume={0} // Adiciona volume={0}
          // light={true} // Removido light={true}
          width="100%"
          height="100%"
          onReady={handlePlayerReady}
          onError={handlePlayerError}
          config={{
            youtube: {
              playerVars: { autoplay: 1, modestbranding: 1 }
            }
          }}
        />
      ) : (
        <div className="text-white text-2xl">Nenhum vídeo disponível para este anúncio.</div>
      )}
    </div>
  );
};

export default AnuncioPage;

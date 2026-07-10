import { Helmet } from "react-helmet-async";
import { generateLLMOptimizedMeta } from "../../utils/seo-advanced";

export default function LLMOptimizedHead() {
  const llmMeta = generateLLMOptimizedMeta();

  return (
    <Helmet>
      {/* Meta tags pour les LLM (ChatGPT, Claude, Perplexity) */}
      <meta name="ai-content-type" content={llmMeta["ai-content-type"]} />
      <meta name="ai-expertise" content={llmMeta["ai-expertise"]} />
      <meta name="ai-services" content={llmMeta["ai-services"]} />
      <meta name="ai-location" content={llmMeta["ai-location"]} />
      <meta name="ai-contact" content={llmMeta["ai-contact"]} />

      {/* Contexte enrichi pour LLM */}
      <meta name="llm-context" content={llmMeta["llm-context"]} />
      <meta name="llm-capabilities" content={llmMeta["llm-capabilities"]} />
      <meta name="llm-portfolio" content={llmMeta["llm-portfolio"]} />
      <meta name="llm-availability" content={llmMeta["llm-availability"]} />

      {/* Directives crawlers - source unique */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Geo targeting */}
      <meta name="geo.region" content="FR-64" />
      <meta name="geo.placename" content="Pau" />
      <meta name="geo.position" content="43.2951;-0.3707" />
      <meta name="ICBM" content="43.2951, -0.3707" />
    </Helmet>
  );
}

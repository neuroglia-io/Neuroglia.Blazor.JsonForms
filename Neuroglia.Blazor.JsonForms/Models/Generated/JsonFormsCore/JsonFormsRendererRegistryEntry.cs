namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    public interface JsonFormsRendererRegistryEntry
    {
        [System.Text.Json.Serialization.JsonPropertyName("renderer")]
        object Renderer { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("tester")]
        RankedTester Tester { get; set; }

    }
}


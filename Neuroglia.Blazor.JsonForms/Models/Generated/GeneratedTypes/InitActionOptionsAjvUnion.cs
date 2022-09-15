namespace Neuroglia.Blazor.JsonForms.Models.GeneratedTypes
{
    using Neuroglia.Blazor.JsonForms.Models.JsonFormsCore;
    class InitActionOptionsAjvUnionJsonConverter : System.Text.Json.Serialization.JsonConverter<InitActionOptionsAjvUnion>
    {
        public override InitActionOptionsAjvUnion Read(ref System.Text.Json.Utf8JsonReader reader, System.Type type, System.Text.Json.JsonSerializerOptions options)
        {
            try { return new InitActionOptionsAjvUnion { InitActionOptionsValue = System.Text.Json.JsonSerializer.Deserialize<InitActionOptions>(ref reader, options) }; } catch (System.Text.Json.JsonException) { }
            try { return new InitActionOptionsAjvUnion { AjvValue = System.Text.Json.JsonSerializer.Deserialize<Ajv>(ref reader, options) }; } catch (System.Text.Json.JsonException) { }
            return default;
        }
        public override void Write(System.Text.Json.Utf8JsonWriter writer, InitActionOptionsAjvUnion value, System.Text.Json.JsonSerializerOptions options)
        {
            if (value.Type == typeof(InitActionOptions)) { System.Text.Json.JsonSerializer.Serialize(writer, value.InitActionOptionsValue, options); return; }
            if (value.Type == typeof(Ajv)) { System.Text.Json.JsonSerializer.Serialize(writer, value.AjvValue, options); return; }
            writer.WriteNullValue();
        }
    }
    [System.Text.Json.Serialization.JsonConverter(typeof(InitActionOptionsAjvUnionJsonConverter))]
    struct InitActionOptionsAjvUnion
    {
        public System.Type? Type { get; set; }
        private InitActionOptions? _initActionOptionsValue;
        public InitActionOptions? InitActionOptionsValue
        {
            get => _initActionOptionsValue;
            set
            {
                ClearValue();
                _initActionOptionsValue = value;
                Type = typeof(InitActionOptions);
            }
        }
        public static implicit operator InitActionOptionsAjvUnion(InitActionOptions value) => new InitActionOptionsAjvUnion { InitActionOptionsValue = value };
        public static implicit operator InitActionOptions?(InitActionOptionsAjvUnion value) => value.InitActionOptionsValue;

        private Ajv? _ajvValue;
        public Ajv? AjvValue
        {
            get => _ajvValue;
            set
            {
                ClearValue();
                _ajvValue = value;
                Type = typeof(Ajv);
            }
        }
        public static implicit operator InitActionOptionsAjvUnion(Ajv value) => new InitActionOptionsAjvUnion { AjvValue = value };
        public static implicit operator Ajv?(InitActionOptionsAjvUnion value) => value.AjvValue;

        public override string? ToString()
        {
            if (Type == typeof(InitActionOptions)) return InitActionOptionsValue?.ToString();
            if (Type == typeof(Ajv)) return AjvValue?.ToString();
            return default;
        }
        public override int GetHashCode()
        {
            if (Type == typeof(InitActionOptions)) return InitActionOptionsValue?.GetHashCode() ?? 0;
            if (Type == typeof(Ajv)) return AjvValue?.GetHashCode() ?? 0;
            return 0;
        }
        private void ClearValue()
        {
            _initActionOptionsValue = default;
            _ajvValue = default;
        }
    }
}

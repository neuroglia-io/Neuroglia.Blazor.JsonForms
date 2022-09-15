namespace Neuroglia.Blazor.JsonForms.Models.GeneratedTypes
{
    using Neuroglia.Blazor.JsonForms.Models.JsonFormsCore;
    class StringArrayJsonSchema7UnionJsonConverter : System.Text.Json.Serialization.JsonConverter<StringArrayJsonSchema7Union>
    {
        public override StringArrayJsonSchema7Union Read(ref System.Text.Json.Utf8JsonReader reader, System.Type type, System.Text.Json.JsonSerializerOptions options)
        {
            try { return new StringArrayJsonSchema7Union { StringArrayValue = System.Text.Json.JsonSerializer.Deserialize<string[]>(ref reader, options) }; } catch (System.Text.Json.JsonException) { }
            try { return new StringArrayJsonSchema7Union { JsonSchema7Value = System.Text.Json.JsonSerializer.Deserialize<JsonSchema7>(ref reader, options) }; } catch (System.Text.Json.JsonException) { }
            return default;
        }
        public override void Write(System.Text.Json.Utf8JsonWriter writer, StringArrayJsonSchema7Union value, System.Text.Json.JsonSerializerOptions options)
        {
            if (value.Type == typeof(string[])) { System.Text.Json.JsonSerializer.Serialize(writer, value.StringArrayValue, options); return; }
            if (value.Type == typeof(JsonSchema7)) { System.Text.Json.JsonSerializer.Serialize(writer, value.JsonSchema7Value, options); return; }
            writer.WriteNullValue();
        }
    }
    [System.Text.Json.Serialization.JsonConverter(typeof(StringArrayJsonSchema7UnionJsonConverter))]
    struct StringArrayJsonSchema7Union
    {
        public System.Type? Type { get; set; }
        private string[]? _stringArrayValue;
        public string[]? StringArrayValue
        {
            get => _stringArrayValue;
            set
            {
                ClearValue();
                _stringArrayValue = value;
                Type = typeof(string[]);
            }
        }
        public static implicit operator StringArrayJsonSchema7Union(string[] value) => new StringArrayJsonSchema7Union { StringArrayValue = value };
        public static implicit operator string[]?(StringArrayJsonSchema7Union value) => value.StringArrayValue;

        private JsonSchema7? _jsonSchema7Value;
        public JsonSchema7? JsonSchema7Value
        {
            get => _jsonSchema7Value;
            set
            {
                ClearValue();
                _jsonSchema7Value = value;
                Type = typeof(JsonSchema7);
            }
        }
        public static implicit operator StringArrayJsonSchema7Union(JsonSchema7 value) => new StringArrayJsonSchema7Union { JsonSchema7Value = value };
        public static implicit operator JsonSchema7?(StringArrayJsonSchema7Union value) => value.JsonSchema7Value;

        public override string? ToString()
        {
            if (Type == typeof(string[])) return StringArrayValue?.ToString();
            if (Type == typeof(JsonSchema7)) return JsonSchema7Value?.ToString();
            return default;
        }
        public override int GetHashCode()
        {
            if (Type == typeof(string[])) return StringArrayValue?.GetHashCode() ?? 0;
            if (Type == typeof(JsonSchema7)) return JsonSchema7Value?.GetHashCode() ?? 0;
            return 0;
        }
        private void ClearValue()
        {
            _stringArrayValue = default;
            _jsonSchema7Value = default;
        }
    }
}

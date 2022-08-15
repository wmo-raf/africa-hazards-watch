CREATE OR REPLACE FUNCTION postgisftw.africa_countries_list()
RETURNS TABLE(iso text, name text)
AS $$
BEGIN
	RETURN QUERY
		SELECT t.gid_0::text as iso,
            t.name_0::text as name
    FROM pgadapter.africa_gadm36_countries t
    ORDER BY t.name_1;
END;
$$
LANGUAGE 'plpgsql' STABLE PARALLEL SAFE;

COMMENT ON FUNCTION postgisftw.africa_countries_list IS 'Get all africa countries';


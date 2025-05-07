CREATE TABLE "genres" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "genres_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "movies" (
	"id" serial PRIMARY KEY NOT NULL,
	"creator_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"director_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"version" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "movies_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE "movies_to_genres" (
	"movie_id" integer NOT NULL,
	"genre_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "movies" ADD CONSTRAINT "movies_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movies" ADD CONSTRAINT "movies_director_id_users_id_fk" FOREIGN KEY ("director_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movies_to_genres" ADD CONSTRAINT "movies_to_genres_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movies_to_genres" ADD CONSTRAINT "movies_to_genres_genre_id_genres_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "movies_creator_id_idx" ON "movies" USING btree ("creator_id");--> statement-breakpoint
CREATE INDEX "movies_director_id_idx" ON "movies" USING btree ("director_id");--> statement-breakpoint
CREATE INDEX "movies_to_genres_movie_id_idx" ON "movies_to_genres" USING btree ("movie_id");--> statement-breakpoint
CREATE INDEX "movies_to_genres_genre_id_idx" ON "movies_to_genres" USING btree ("genre_id");